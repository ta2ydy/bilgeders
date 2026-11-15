import type {StaticImageData} from 'next/image';
import unit1Img from '@/src/assets/images/unit1_allah_inanci_1794764646036.jpg';
import unit2Img from '@/src/assets/images/unit2_namaz_1794764646176.jpg';
import unit3Img from '@/src/assets/images/unit3_kuran_kerim_1794764646530.jpg';
import unit4Img from '@/src/assets/images/unit4_peygamber_kissalari_1794764647234.jpg';
import unit5Img from '@/src/assets/images/unit5_mimarimizde_din_1794764647521.jpg';
import type {UnitId} from './curriculum';

export const UNIT_IMAGES: Record<UnitId, {src: StaticImageData; alt: string}> = {
  'allah-inanci': {
    src: unit1Img,
    alt: 'Evrendeki gece-gündüz düzenini ve doğa uyumunu gösteren illüstrasyon',
  },
  namaz: {
    src: unit2Img,
    alt: 'Sabah ışığında tarihi bir cami avlusu ve mermer şadırvan',
  },
  'kuran-i-kerim': {
    src: unit3Img,
    alt: 'Ahşap rahle üzerinde açık duran tezhipli Kur’an-ı Kerim mushafı',
  },
  'peygamber-kissalari': {
    src: unit4Img,
    alt: 'Zeytin ağaçları ve tarihi taş kemer eşliğinde gün doğumu manzarası',
  },
  'mimarimizde-din': {
    src: unit5Img,
    alt: 'Klasik Osmanlı cami kubbeleri, kemerli avlu ve ince minareler',
  },
};
