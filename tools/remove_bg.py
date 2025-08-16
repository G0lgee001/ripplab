from PIL import Image, ImageStat
import sys
import os


def remove_background(input_path: str, output_path: str, tolerance: int = 60) -> None:
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size

    # Sample a small region from top-left to estimate background color
    sample_box = (0, 0, min(10, width), min(10, height))
    sample = img.crop(sample_box).convert('RGB')
    stat = ImageStat.Stat(sample)
    bg_r, bg_g, bg_b = [int(v) for v in stat.mean]

    pixels = img.getdata()
    new_pixels = []

    tol = tolerance
    tol2 = tol * tol

    for pixel in pixels:
        r, g, b, a = pixel
        dr = r - bg_r
        dg = g - bg_g
        db = b - bg_b
        dist2 = dr*dr + dg*dg + db*db
        if dist2 <= tol2:
            new_pixels.append((r, g, b, 0))
        else:
            new_pixels.append((r, g, b, a))

    img.putdata(new_pixels)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: python remove_bg.py <input> <output> [tolerance]')
        sys.exit(1)
    inp = sys.argv[1]
    outp = sys.argv[2]
    tol = int(sys.argv[3]) if len(sys.argv) > 3 else 60
    remove_background(inp, outp, tol)