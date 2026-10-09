<?php

/**
 * Yandex Maps org pages render the aggregate rating as plain schema.org
 * microdata (no JS needed) — a regular cURL GET with a browser User-Agent
 * sees it directly. Anchored on the `aggregateRating`/`AggregateRating`
 * block specifically, not just the first "ratingValue" on the page — that
 * would catch an individual review's rating instead further down.
 *
 * @return string|null e.g. "4.9", or null if the page didn't parse
 *   (never falls back to a guessed value — see restaurants.ratingValue's
 *   "never invent a rating" rule).
 */
function fetch_yandex_rating(string $orgUrl): ?string
{
    $ch = curl_init($orgUrl);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        CURLOPT_FOLLOWLOCATION => true,
    ]);
    $html = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($html === false || $status >= 300) {
        error_log("[yandex-rating] fetch failed for $orgUrl (HTTP $status)");
        return null;
    }

    $anchor = strpos($html, 'AggregateRating');
    if ($anchor === false) {
        error_log("[yandex-rating] no AggregateRating block found at $orgUrl");
        return null;
    }

    $window = substr($html, $anchor, 500);
    if (!preg_match('/ratingValue"\s*content="([\d.]+)"/', $window, $m)) {
        error_log("[yandex-rating] AggregateRating block found but no ratingValue at $orgUrl");
        return null;
    }

    return (string)round((float)$m[1], 1);
}
