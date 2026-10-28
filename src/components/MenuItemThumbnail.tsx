import Image from "next/image";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { withAssetVersion } from "@/lib/asset-version";
import { BASE_PATH } from "@/lib/base-path";
import type { MenuItem } from "@/data/menu";

export function MenuItemThumbnail({
  item,
  className = "",
  sizes = "64px",
}: {
  item: MenuItem;
  className?: string;
  sizes?: string;
}) {
  if (item.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={`${BASE_PATH}${withAssetVersion(item.image)}`}
          alt={item.name}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return <PlaceholderImage label={item.name} tone={item.tone} className={className} />;
}
