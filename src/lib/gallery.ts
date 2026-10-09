/** public/gallery 下的实景照片文件名（唯一来源，首页图库与 /fotos 专题页共用） */
export const GALLERY_FILES = [
  'plaza-de-la-hispanidad-or-spain (1).jpg',
  'plaza-de-la-hispanidad-or-spain (2).jpg',
  'plaza-de-la-hispanidad-or-spain (4).jpg',
  'plaza-de-la-hispanidad-or-spain (5).jpg',
  'plaza-de-la-hispanidad-or-spain (6).jpg',
  'plaza-de-la-hispanidad-or-spain (7).jpg',
  'plaza-de-la-hispanidad-or-spain (8).jpg',
  'plaza-de-la-hispanidad-or-spain (10).jpg',
  'plaza-de-la-hispanidad-or-spain (11).jpg',
  'plaza-de-la-hispanidad-or-spain (12).jpg',
  'plaza-de-la-hispanidad-or-spain (13).jpg',
  'plaza-de-la-hispanidad-or-spain (15).jpg',
  'plaza-de-la-hispanidad-or-spain (16).jpg',
  'plaza-de-la-hispanidad-or-spain (18).jpg',
  'plaza-de-la-hispanidad-or-spain (22).jpg',
  'plaza-de-la-hispanidad-or-spain (24).jpg',
  'plaza-de-la-hispanidad-or-spain (25).jpg',
  'plaza-de-la-hispanidad-or-spain (28).jpg',
  'plaza-de-la-hispanidad-or-spain (30).jpg',
  'plaza-de-la-hispanidad-or-spain (31).jpg',
];

export function galleryPhotos(captions: string[], fallback: string) {
  return GALLERY_FILES.map((file, i) => {
    const caption = captions?.[i] || `${fallback} ${i + 1}`;
    return {
      src: encodeURI(`/gallery/${file}`),
      caption,
      alt: `${caption} — ${fallback}`,
    };
  });
}
