<?php

/**
 * Validates and stores an uploaded image under uploads/{$subdir}/, returning
 * the URL to save in the DB (or null on any failure — caller shows a
 * generic error, never trusts the client's claimed filename/mime type).
 *
 * Content is verified via getimagesize() (real image bytes, not just an
 * extension or Content-Type header) and the destination filename is always
 * server-generated — never derived from the uploaded filename — so a
 * disguised .php upload can't land as an executable name even before the
 * uploads/ directory's own .htaccess blocks script execution there.
 *
 * Deletes $oldUrl's file first if it was one of our own uploads (never a
 * static /logos/.../menu/... path baked into the Next.js build, which this
 * backend doesn't own) so replacing an image doesn't pile up orphans.
 */
function handle_image_upload(?array $file, string $subdir, string $baseName, ?string $oldUrl = null): ?string
{
    if (!$file || $file['error'] !== UPLOAD_ERR_OK) return null;
    if ($file['size'] > 5 * 1024 * 1024) return null;

    $info = @getimagesize($file['tmp_name']);
    if ($info === false) return null;

    $ext = match ($info[2]) {
        IMAGETYPE_PNG => 'png',
        IMAGETYPE_JPEG => 'jpg',
        IMAGETYPE_WEBP => 'webp',
        default => null,
    };
    if ($ext === null) return null;

    $dir = __DIR__ . "/../uploads/{$subdir}";
    if (!is_dir($dir)) mkdir($dir, 0755, true);

    $filename = $baseName . '-' . time() . '.' . $ext;
    if (!move_uploaded_file($file['tmp_name'], $dir . '/' . $filename)) return null;

    delete_uploaded_image($oldUrl, $subdir, $dir);

    // Protocol-relative: works today over http and keeps working once SSL
    // is set up, with no DB migration needed either time.
    $host = $_SERVER['HTTP_HOST'] ?? 'ekranidze.ru';
    return "//{$host}/backend/uploads/{$subdir}/{$filename}";
}

function delete_uploaded_image(?string $url, string $subdir, string $dir): void
{
    if (!$url) return;
    $prefix = "/backend/uploads/{$subdir}/";
    if (strpos($url, $prefix) === false) return;

    $filename = basename($url);
    if ($filename === '' || str_contains($filename, '..')) return;

    $path = $dir . '/' . $filename;
    if (is_file($path)) unlink($path);
}

function handle_logo_upload(?array $file, string $restaurantId, ?string $oldUrl = null): ?string
{
    return handle_image_upload($file, 'logos', $restaurantId, $oldUrl);
}

function handle_header_icon_upload(?array $file, string $restaurantId, ?string $oldUrl = null): ?string
{
    return handle_image_upload($file, 'logos', "{$restaurantId}-header", $oldUrl);
}

function handle_dish_photo_upload(?array $file, string $restaurantId, string $itemId, ?string $oldUrl = null): ?string
{
    return handle_image_upload($file, 'menu', "{$restaurantId}-{$itemId}", $oldUrl);
}
