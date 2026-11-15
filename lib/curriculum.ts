export type UnitId =
  | 'allah-inanci'
  | 'namaz'
  | 'kuran-i-kerim'
  | 'peygamber-kissalari'
  | 'mimarimizde-din';

export type LearningMode = 'ozet' | 'kartlar' | 'yarisma' | 'rehber';

export interface UnitTopic {
  baslik: string;
  ozet: string;
  ornek: string;
}

export interface SurahOrPrayer {
  ad: string;
  tur: 'Sure' | 'Dua';
  ozellik: string;
  okunusu: string[];
  anlami: string[];
  mesaj: string;
}

export interface FlashcardItem {
  id: string;
  kavram: string;
  ipucu: string;
  tanim: string;
  ornek: string;
}

export interface QuizQuestion {
  id: string;
  soru: string;
  secenekler: [string, string, string, string];
  dogruIndex: number;
  aciklama: string;
  aiGenerated?: boolean;
}

export interface ArchitectureElement {
  id: string;
  ad: string;
  kategori: 'İç Mekân' | 'Dış Mekân' | 'Külliye Yapısı';
  tanim: string;
  islev: string;
}

export interface UnitData {
  id: UnitId;
  numara: number;
  kisaAd: string;
  tamAd: string;
  englishTitle: string;
  altBaslik: string;
  kazanimlar: string[];
  konular: UnitTopic[];
  sureDua: SurahOrPrayer;
  kavramlar: FlashcardItem[];
  sorular: QuizQuestion[];
  rehberSorulari: string[];
  mimariOgeler?: ArchitectureElement[];
}

export const MEB_UNITS: UnitData[] = [
  {
    id: 'allah-inanci',
    numara: 1,
    kisaAd: 'Allah İnancı',
    tamAd: '1. Ünite: Allah İnancı',
    englishTitle: 'Unit 1: Belief in Allah (Allah İnancı)',
    altBaslik: 'Evrendeki Düzen, Esma-i Hüsna, Dua ve İhlas Suresi',
    kazanimlar: [
      'Evrendeki mükemmel düzeni gözlemleyerek Allah’ın varlığı ve birliği sonucuna ulaşır.',
      'Allah’ın (c.c.) güzel isimlerinden Rahman, Rahim, Alim, Semî, Basîr ve Kadir isimlerini açıklar.',
      'Dua etmenin insan ile Allah arasındaki bağdaki yerini ve önemini kavrar.',
      'İhlas Suresi’ni doğru okur ve temel mesajını (tevhid) yorumlar.',
    ],
    konular: [
      {
        baslik: 'Evrendeki Düzen ve Allah’ın Varlığı',
        ozet: 'Gece ile gündüzün şaşmadan birbirini takip etmesi, mevsimlerin sırayla gelmesi, su döngüsü ve gök cisimlerinin kendi yörüngelerinde hareket etmesi evrende kusursuz bir ölçü olduğunu gösterir. Bu düzen tesadüfle oluşamayacağına göre, her şeyi yaratan ve yöneten yüce bir yaratıcı vardır.',
        ornek: 'Güneş’in Dünya’ya olan mesafesi yaşam için tam ölçülüdür; biraz daha yakın veya uzak olsaydı canlılık mümkün olmazdı.',
      },
      {
        baslik: 'Allah’ın Güzel İsimleri: Esma-i Hüsna',
        ozet: 'Yüce Allah’ı isim ve sıfatlarıyla tanırız. Rahman bütün yaratılmışlara merhamet eden; Rahim ahirette sadece inananlara merhamet edecek olan; Alim her şeyi bilen; Semî her şeyi işiten; Basîr her şeyi gören; Kadir ise her şeye gücü yeten demektir.',
        ornek: 'Allah’ın Alim ve Basîr olduğunu bilen bir öğrenci, kimsenin görmediği yerde bile dürüst davranmaya özen gösterir.',
      },
      {
        baslik: 'Kul ile Allah Arasındaki Bağ: Dua',
        ozet: 'Dua; insanın Yüce Allah’a yönelerek şükretmesi, duygularını paylaşması ve O’ndan yardım dilemesidir. Dua etmek insana iç huzuru verir; ancak önce elimizden gelen çabayı göstermeli, ardından Allah’a güvenmeliyiz.',
        ornek: 'Sınava düzenli çalıştıktan sonra "Allah’ım zihnimi aç ve emeğimi bereketli kıl" diye dua etmek güzel bir örnektir.',
      },
    ],
    sureDua: {
      ad: 'İhlas Suresi',
      tur: 'Sure',
      ozellik:
        'Kur’an-ı Kerim’in 112. suresidir ve 4 ayetten oluşur. Allah’ın birliğini (tevhid) en özlü biçimde anlatır.',
      okunusu: [
        '1. Kul hüvallâhü ehad.',
        '2. Allâhüs-samed.',
        '3. Lem yelid ve lem yûled.',
        '4. Ve lem yekün lehû küfüven ehad.',
      ],
      anlami: [
        '1. De ki: O, Allah’tır, bir tektir.',
        '2. Allah Samed’dir (Her şey O’na muhtaçtır; O hiçbir şeye muhtaç değildir).',
        '3. O doğmamış ve doğurmamıştır.',
        '4. O’nun hiçbir dengi ve benzeri yoktur.',
      ],
      mesaj:
        'İhlas suresi İslam’ın temeli olan tevhid inancını öğretir: Yüce Allah tektir, eşi ve benzeri yoktur, tüm varlıklar O’na muhtaçtır.',
    },
    kavramlar: [
      {
        id: 'u1-k1',
        kavram: 'Tevhid',
        ipucu: 'İslam inancının temeli',
        tanim: 'Allah’ın (c.c.) var ve bir olduğuna, eşi ve benzerinin bulunmadığına inanmak demektir.',
        ornek: 'İhlas suresindeki "O Allah birdir" ayeti tevhid inancını en açık şekilde ifade eder.',
      },
      {
        id: 'u1-k2',
        kavram: 'Esma-i Hüsna',
        ipucu: '99 güzel isim',
        tanim: 'Yüce Allah’ın sahip olduğu bütün güzel isimleri ifade eden kavramdır.',
        ornek: 'Rahman, Rahim, Alim, Semî, Basîr ve Kadir Allah’ın güzel isimlerindendir.',
      },
      {
        id: 'u1-k3',
        kavram: 'Rahman ve Rahim',
        ipucu: 'Merhamet sıfatları',
        tanim: 'Rahman dünyada ayırt etmeksizin tüm varlıklara merhamet eden; Rahim ise ahirette sadece inananlara merhamet edecek olan demektir.',
        ornek: 'Her işimize başlarken "Bismillahirrahmanirrahim" diyerek O’nun merhametine sığınırız.',
      },
      {
        id: 'u1-k4',
        kavram: 'Samed',
        ipucu: 'İhlas suresinin 2. ayeti',
        tanim: 'Her şeyin varlığını sürdürmek için kendisine muhtaç olduğu, ancak kendisinin hiçbir şeye muhtaç olmadığı anlamına gelen ilahi isimdir.',
        ornek: 'Canlıların suya ve havaya ihtiyacı varken Allah’ın hiçbir şeye ihtiyacı yoktur.',
      },
      {
        id: 'u1-k5',
        kavram: 'Semî ve Basîr',
        ipucu: 'İşitme ve görme',
        tanim: 'Semî Allah’ın her şeyi eksiksiz işitmesi; Basîr ise gizli ve açık her şeyi görmesi anlamına gelir.',
        ornek: 'İçimizden ettiğimiz sessiz bir duayı bile Allah işitir ve bilir.',
      },
      {
        id: 'u1-k6',
        kavram: 'Alim ve Kadir',
        ipucu: 'İlim ve güç',
        tanim: 'Alim Allah’ın her şeyi en ince ayrıntısına kadar bilmesi; Kadir ise her şeye gücünün yetmesi demektir.',
        ornek: 'Koca gezegenleri yörüngesinde tutması Allah’ın Kadir isminin yansımasıdır.',
      },
      {
        id: 'u1-k7',
        kavram: 'Dua',
        ipucu: 'Allah ile samimi iletişim',
        tanim: 'İnsanın Yüce Allah’a içtenlikle yönelmesi, şükretmesi ve O’ndan yardım istemesidir.',
        ornek: 'Yemekten sonra "Elhamdülillah" demek bir şükür duasıdır.',
      },
      {
        id: 'u1-k8',
        kavram: 'İhlas',
        ipucu: 'Samimiyet',
        tanim: 'İbadetleri ve iyilikleri yalnızca Allah’ın rızasını kazanmak için gösterişten uzak, içtenlikle yapmaktır.',
        ornek: 'Bir arkadaşımıza yardım ederken kimsenin övgüsünü beklemeden sadece iyilik olsun diye davranmak.',
      },
    ],
    sorular: [
      {
        id: 'u1-s1',
        soru: 'Mevsimlerin şaşmadan birbirini izlemesi ve gece ile gündüzün düzenli oluşması öncelikle neyin kanıtıdır?',
        secenekler: [
          'Evrende tesadüfi olayların yaşandığının',
          'Evrende mükemmel bir düzen ve yaratıcının bulunduğunun',
          'Doğadaki olayların kendiliğinden değiştiğinin',
          'Yalnızca Dünya’nın hareket ettiğinin',
        ],
        dogruIndex: 1,
        aciklama:
          'Evrendeki ölçülü ve uyumlu işleyiş, her şeyi planlayıp yaratan Yüce Allah’ın varlığının ve birliğinin en açık delilidir.',
      },
      {
        id: 'u1-s2',
        soru: 'Allah’ın (c.c.) "her şeyi gizli ve açık en iyi şekilde görmesi" anlamındaki güzel ismi aşağıdakilerden hangisidir?',
        secenekler: ['Semî', 'Kadir', 'Basîr', 'Rahman'],
        dogruIndex: 2,
        aciklama:
          'Basîr "her şeyi gören", Semî "her şeyi işiten", Kadir "her şeye gücü yeten", Rahman ise "tüm varlıklara merhamet eden" demektir.',
      },
      {
        id: 'u1-s3',
        soru: 'İhlas Suresi’nde geçen "Allâhüs-samed" ayeti bize aşağıdakilerden hangisini öğretir?',
        secenekler: [
          'Her şey O’na muhtaçtır, O hiçbir şeye muhtaç değildir.',
          'Allah her zaman gece ve gündüzü değiştirir.',
          'İnsanlar yalnızca zor zamanlarda dua etmelidir.',
          'Kur’an-ı Kerim’de 114 sure vardır.',
        ],
        dogruIndex: 0,
        aciklama:
          'Samed ismi, tüm varlıkların Allah’a muhtaç olduğunu ancak Yüce Allah’ın hiçbir varlığa muhtaç olmadığını bildirir.',
      },
      {
        id: 'u1-s4',
        soru: 'Bir öğrencinin derslerine hiç çalışmadan sadece "Sınavdan yüksek not alayım" diye dua etmesi konusunda aşağıdakilerden hangisi doğrudur?',
        secenekler: [
          'Dua etmek için çalışmaya gerek yoktur.',
          'Önce elinden gelen çabayı göstermeli, sonra dua etmelidir.',
          'Sadece büyükler dua edebilir.',
          'Dua yalnızca akşam vakti kabul edilir.',
        ],
        dogruIndex: 1,
        aciklama:
          'Güzel dua; kişinin kendi üzerine düşen sorumluluğu ve çalışmayı yerine getirdikten sonra Allah’tan yardım dilemesidir.',
      },
      {
        id: 'u1-s5',
        soru: 'Allah’ın var ve bir olduğuna, eşinin ve benzerinin bulunmadığına inanmaya ne ad verilir?',
        secenekler: ['İbadet', 'Tevhid', 'Teyemmüm', 'Kıssa'],
        dogruIndex: 1,
        aciklama:
          'Tevhid, İslam inancının özüdür ve Yüce Allah’ı birlemek, O’na hiçbir şeyi ortak koşmamak anlamına gelir.',
      },
    ],
    rehberSorulari: [
      'Rahman ve Rahim isimleri arasındaki fark nedir?',
      'Evrendeki düzen Allah’ın varlığını nasıl gösterir?',
      'İhlas suresi bize hangi temel mesajı verir?',
      'Doğru bir şekilde nasıl dua etmeliyiz?',
    ],
  },
  {
    id: 'namaz',
    numara: 2,
    kisaAd: 'Namaz',
    tamAd: '2. Ünite: Namaz',
    englishTitle: 'Unit 2: Prayer (Namaz)',
    altBaslik: 'Namazın Önemi, Hazırlık Şartları, Çeşitleri ve Tahiyyat Duası',
    kazanimlar: [
      'Namaz ibadetinin insana kazandırdığı disiplin, huzur ve kardeşlik değerlerini fark eder.',
      'Abdest, gusül ve teyemmümün alınış şekillerini ve temizlik bilincini kavrar.',
      'Namazın dışından ve içinden farzlarını sırasıyla ayırt eder.',
      'Farz, vacip ve nafile namaz çeşitlerini tanır; Tahiyyat Duası’nı anlamıyla öğrenir.',
    ],
    konular: [
      {
        baslik: 'Namaz İbadeti ve Temizlik',
        ozet: 'Namaz, İslam’ın beş temel şartından biridir ve günde beş vakit kılınır. Namaza başlamadan önce hem bedenen hem de elbise ve mekân olarak temiz olmak gerekir. Bu temizlik abdest, gusül veya su bulunmadığında teyemmüm ile sağlanır.',
        ornek: 'Abdest alırken elleri, ağzı, burnu, yüzü ve kolları yıkamak; başı meshedip ayakları yıkamak hem maddi temizlik hem manevi arınmadır.',
      },
      {
        baslik: 'Namazın Farzları (Hazırlık ve Rükünler)',
        ozet: 'Namazın 12 farzı vardır. Altısı namazdan önce yapılır (Hadesten taharet, Necasetten taharet, Setr-i avret, İstikbal-i kıble, Vakit, Niyet). Altısı ise namazın içindedir: İftitah tekbiri, Kıyam, Kıraat, Rükû, Secde ve Kâde-i ahire.',
        ornek: 'Kıbleye (Kâbe yönüne) dönmek dışındaki farzlardan, rükû ve secdeye gitmek ise namazın içindeki farzlardandır.',
      },
      {
        baslik: 'Namaz Çeşitleri ve Birlikte İbadet',
        ozet: 'Hükmüne göre namazlar üçe ayrılır: Beş vakit namaz, Cuma ve Cenaze namazı (farz-ı kifaye) farzdır. Vitir ve Bayram namazları vaciptir. Vakit namazlarının sünnetleri ve Ramazan gecelerinde kılınan Teravih namazı ise nafile (sünnet) namazlardır.',
        ornek: 'Cuma ve bayram namazları camide cemaatle kılınarak insanların birbirleriyle selamlaşıp kaynaşmasını sağlar.',
      },
    ],
    sureDua: {
      ad: 'Tahiyyat (Ettehiyyatü) Duası',
      tur: 'Dua',
      ozellik:
        'Namazların ikişer rekâtlık ve son oturuşlarında (ka’de) okunan, Allah’a övgü ve Peygamberimize selam içeren duadır.',
      okunusu: [
        'Ettehiyyâtü lillâhi ves-salevâtü vet-tayyibât.',
        'Es-selâmü aleyke eyyühen-nebiyyü ve rahmetullâhi ve berekâtüh.',
        'Es-selâmü aleynâ ve alâ ibâdillâhis-sâlihîn.',
        'Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve resûlüh.',
      ],
      anlami: [
        'Bütün dil ile yapılan övgüler, bedeni ibadetler ve mali iyilikler Allah içindir.',
        'Ey Peygamber! Allah’ın selamı, rahmeti ve bereketi senin üzerine olsun.',
        'Selam bizim üzerimize ve Allah’ın iyi (salih) kullarının üzerine olsun.',
        'Şahitlik ederim ki Allah’tan başka ilah yoktur ve yine şahitlik ederim ki Muhammed O’nun kulu ve elçisidir.',
      ],
      mesaj:
        'Tahiyyat duası, namazda hem Rabbimizi yücelttiğimiz hem de Peygamberimize ve bütün iyi insanlara selam gönderdiğimiz anlamlı bir duadır.',
    },
    kavramlar: [
      {
        id: 'u2-k1',
        kavram: 'Abdest',
        ipucu: 'Namaz öncesi temizlik',
        tanim: 'Yüzü, dirseklere kadar kolları ve ayakları yıkamak, başın dörtte birini meshetmek suretiyle yapılan manevi temizliktir.',
        ornek: 'Namaz kılmadan ve Kur’an-ı Kerim’e dokunmadan önce abdest alırız.',
      },
      {
        id: 'u2-k2',
        kavram: 'Teyemmüm',
        ipucu: 'Su bulunmadığında temizlik',
        tanim: 'Su bulunmadığı veya sağlık sebebiyle su kullanılamadığı durumlarda temiz toprak ya da toprak cinsinden bir şeye elleri sürerek alınan abdesttir.',
        ornek: 'Suyun kesildiği bir yolculukta niyet edilerek temiz toprakla teyemmüm alınabilir.',
      },
      {
        id: 'u2-k3',
        kavram: 'İftitah Tekbiri',
        ipucu: 'Namaza başlangıç',
        tanim: 'Namaza başlarken "Allahu Ekber" diyerek tekbir almaktır ve namazın içindeki farzlardandır.',
        ornek: 'Niyet ettikten sonra elleri kaldırıp Allahu Ekber demekle namaz başlamış olur.',
      },
      {
        id: 'u2-k4',
        kavram: 'Kıyam ve Kıraat',
        ipucu: 'Ayakta durma ve okuma',
        tanim: 'Kıyam namazda ayakta durmak; Kıraat ise namazda ayaktayken Kur’an-ı Kerim’den sure veya ayetler okumaktır.',
        ornek: 'Namazın her rekâtında Fatiha suresini okumak kıraat rüknünü yerine getirmektir.',
      },
      {
        id: 'u2-k5',
        kavram: 'Rükû ve Secde',
        ipucu: 'Saygı ve teslimiyet',
        tanim: 'Rükû elleri dizlere koyarak eğilmek; Secde ise alın, burun, eller, dizler ve ayak parmaklarını yere koyarak Allah’a en yakın olunan haldir.',
        ornek: 'Secdedeyken "Sübhâne Rabbiye’l-a’lâ" diyerek Yüce Allah’ı tesbih ederiz.',
      },
      {
        id: 'u2-k6',
        kavram: 'Kâde-i Ahire',
        ipucu: 'Son oturuş',
        tanim: 'Namazın sonunda Tahiyyat duasını okuyacak kadar süre oturmaktır.',
        ornek: 'Son oturuşta Tahiyyat, Salli-Barik ve Rabbena duaları okunup selam verilir.',
      },
      {
        id: 'u2-k7',
        kavram: 'İstikbal-i Kıble',
        ipucu: 'Yönelme şartı',
        tanim: 'Namaz kılarken Mekke’de bulunan Kâbe yönüne dönmektir.',
        ornek: 'Camilerdeki mihraplar cemaate kıble yönünü gösterir.',
      },
      {
        id: 'u2-k8',
        kavram: 'Kamet',
        ipucu: 'Farz namaz öncesi çağrı',
        tanim: 'Farz namazlara başlamadan hemen önce ezan sözlerine "Kad kâmetis-salâh" ifadesi eklenerek okunan çağrıdır.',
        ornek: 'Cemaatle kılınacak öğle namazının farzından önce müezzin kamet getirir.',
      },
    ],
    sorular: [
      {
        id: 'u2-s1',
        soru: 'Aşağıdakilerden hangisi namazın dışındaki (hazırlık) farzlarından biri DEĞİLDİR?',
        secenekler: [
          'İstikbal-i kıble',
          'Hadesten taharet',
          'Rükûya eğilmek',
          'Vaktin girmesi',
        ],
        dogruIndex: 2,
        aciklama:
          'Rükûya eğilmek namazın içindeki farzlardan (rükünlerinden) biridir; diğerleri ise namaza başlamadan önce yerine getirilen şartlardır.',
      },
      {
        id: 'u2-s2',
        soru: 'Su bulunmadığı veya hastalığı sebebiyle su kullanamadığı için temiz toprak ile yapılan abdeste ne ad verilir?',
        secenekler: ['Gusül', 'Teyemmüm', 'İtikâf', 'Kıraat'],
        dogruIndex: 1,
        aciklama:
          'Teyemmüm, suyun olmadığı ya da kullanılamadığı durumlarda temiz toprakla alınan kolaylaştırıcı bir temizlik şeklidir.',
      },
      {
        id: 'u2-s3',
        soru: 'Aşağıdaki namazlardan hangisi hükmü bakımından "vacip" namazlar grubunda yer alır?',
        secenekler: [
          'Sabah namazının farzı',
          'Teravih namazı',
          'Bayram ve Vitir namazları',
          'Cuma namazı',
        ],
        dogruIndex: 2,
        aciklama:
          'Bayram namazları ile yatsı namazından sonra kılınan Vitir namazı vacip; Teravih nafile/sünnet; beş vakit ve Cuma namazı ise farzdır.',
      },
      {
        id: 'u2-s4',
        soru: 'Namaz kılarken ellerimizi dizlerimize koyarak sırtımız yere paralel olacak şekilde eğildiğimiz bölüme ne ad verilir?',
        secenekler: ['Kıyam', 'Rükû', 'Secde', 'Kâde'],
        dogruIndex: 1,
        aciklama:
          'Rükû, ayaktayken elleri dizlere koyarak eğilmektir. Alın ve burnun yere konduğu bölüme ise secde denir.',
      },
      {
        id: 'u2-s5',
        soru: 'Tahiyyat duası namazın hangi bölümünde okunur?',
        secenekler: [
          'Sadece namaza başlarken ayakta',
          'Rükûda eğilirken',
          'Namazın oturuş (ka’de) bölümlerinde',
          'Yalnızca abdest alırken',
        ],
        dogruIndex: 2,
        aciklama:
          'Tahiyyat duası, iki rekâtlı namazların sonunda ve üç ya da dört rekâtlı namazların hem ilk hem son oturuşlarında okunur.',
      },
    ],
    rehberSorulari: [
      'Namazın dışından ve içinden farzları nelerdir?',
      'Teyemmüm nasıl ve hangi durumlarda alınır?',
      'Farz, vacip ve nafile namazlar arasındaki fark nedir?',
      'Tahiyyat duasında kime selam gönderiyoruz?',
    ],
  },
  {
    id: 'kuran-i-kerim',
    numara: 3,
    kisaAd: "Kur'an-ı Kerim",
    tamAd: "3. Ünite: Kur'an-ı Kerim",
    englishTitle: 'Unit 3: The Holy Quran (Kur’an-ı Kerim)',
    altBaslik: 'İç Düzeni, Temel Özellikleri, Ana Konuları ve Kevser Suresi',
    kazanimlar: [
      'Kur’an-ı Kerim’in iç düzenini oluşturan ayet, sure ve cüz kavramlarını tanır.',
      'Kur’an-ı Kerim’in son ilahi kitap olması ve korunmuşluğu gibi temel özelliklerini açıklar.',
      'Kur’an’ın ana konularını (İnanç, İbadet, Ahlak, Kıssa) örneklerle ayırt eder.',
      'Kevser Suresi’ni okur, anlamını ve şükür mesajını açıklar.',
    ],
    konular: [
      {
        baslik: 'Kur’an-ı Kerim’in İç Düzeni',
        ozet: 'Kur’an-ı Kerim 610 yılında Ramazan ayında, Kadir Gecesi’nde indirilmeye başlanmış ve 23 yılda tamamlanmıştır. Her bir cümlesine ayet (yaklaşık 6236 ayet), ayetlerden oluşan bölümlere sure (114 sure), 20 sayfalık her bölüme ise cüz (30 cüz) adı verilir.',
        ornek: 'Kur’an’ın ilk suresi Fatiha, en uzun suresi Bakara, en kısa suresi Kevser ve son suresi Nas suresidir.',
      },
      {
        baslik: 'Kur’an’ın Temel Özellikleri',
        ozet: 'Kur’an-ı Kerim, Hz. Muhammed’e (s.a.v.) vahiy meleği Cebrail (a.s.) aracılığıyla gönderilmiş son ilahi kitaptır. Bütün insanlığa gönderildiği için evrenseldir; günümüze kadar tek bir harfi bile değişmeden korunmuştur.',
        ornek: 'Kur’an’ı baştan sona okuyup bitirmeye hatim, birinin okuyup diğerlerinin takip etmesine ise mukabele denir.',
      },
      {
        baslik: 'Kur’an-ı Kerim’in Ana Konuları',
        ozet: 'Kur’an insanlara doğru yolu göstermek için dört ana konuyu işler: İnanç (Allah’a ve ahirete iman), İbadet (namaz, oruç, zekât), Ahlak (dürüstlük, saygı, yardımlaşma) ve Kıssalar (peygamberlerin örnek hayatları).',
        ornek: '"Doğruluktan ayrılmayın ve anne-babanıza iyi davranın" ayetleri ahlak konusuna girer.',
      },
    ],
    sureDua: {
      ad: 'Kevser Suresi',
      tur: 'Sure',
      ozellik:
        'Kur’an-ı Kerim’in 108. suresi ve 3 ayetle en kısa suresidir. Adını ilk ayette geçen ve "bol nimet" anlamına gelen Kevser’den alır.',
      okunusu: [
        '1. İnnâ a’taynâkel-kevser.',
        '2. Fesalli lirabbike venhar.',
        '3. İnne şânieke hüvel-ebter.',
      ],
      anlami: [
        '1. Şüphesiz biz sana Kevser’i (bol hayır ve bereketi) verdik.',
        '2. Öyleyse Rabbin için namaz kıl ve kurban kes.',
        '3. Doğrusu sana kin besleyen (peygamberimize düşmanlık eden) asıl soyu kesik olanın ta kendisidir.',
      ],
      mesaj:
        'Kevser suresi, Allah’ın verdiği sayısız nimete karşılık namaz kılarak ve kurban ibadetiyle şükretmemiz gerektiğini öğretir.',
    },
    kavramlar: [
      {
        id: 'u3-k1',
        kavram: 'Ayet',
        ipucu: 'Kur’an’ın en küçük anlam birimi',
        tanim: 'Kur’an-ı Kerim surelerini oluşturan, durak işaretleriyle ayrılmış her bir ilahi cümle veya ifadedir.',
        ornek: 'Kevser suresi 3 ayetten, İhlas suresi ise 4 ayetten oluşur.',
      },
      {
        id: 'u3-k2',
        kavram: 'Sure',
        ipucu: 'Toplam 114 bölüm',
        tanim: 'Ayetlerin bir araya gelmesiyle oluşan, başı ve sonu belli Kur’an bölümleridir.',
        ornek: 'Fatiha suresi Kur’an-ı Kerim’in ilk suresidir.',
      },
      {
        id: 'u3-k3',
        kavram: 'Cüz',
        ipucu: 'Toplam 30 bölüm',
        tanim: 'Okumayı ve ezberlemeyi kolaylaştırmak için Kur’an-ı Kerim’in ayrıldığı 20’şer sayfalık her bir bölümdür.',
        ornek: 'Ramazan ayında her gün bir cüz okuyarak ay sonunda hatim tamamlanabilir.',
      },
      {
        id: 'u3-k4',
        kavram: 'Mukabele',
        ipucu: 'Karşılıklı okuma ve takip',
        tanim: 'Bir kişinin Kur’an’ı sesli olarak okuması, diğerlerinin ise mushaftan sessizce takip etmesi geleneğidir.',
        ornek: 'Ramazan ayında camilerde ve evlerde yapılan mukabeleler toplumsal kaynaşmayı artırır.',
      },
      {
        id: 'u3-k5',
        kavram: 'Hatim',
        ipucu: 'Baştan sona okuma',
        tanim: 'Kur’an-ı Kerim’i Fatiha suresinden Nas suresine kadar baştan sona eksiksiz okuyup bitirmektir.',
        ornek: 'Hatim tamamlandıktan sonra sevdiklerimiz ve tüm insanlık için hatim duası yapılır.',
      },
      {
        id: 'u3-k6',
        kavram: 'Hafız',
        ipucu: 'Gönülden koruyan',
        tanim: 'Kur’an-ı Kerim’in tamamını başından sonuna kadar ezberleyen kimseye verilen unvandır.',
        ornek: 'Hafızlar Kur’an’ın korunmasında tarih boyunca çok önemli bir rol üstlenmiştir.',
      },
      {
        id: 'u3-k7',
        kavram: 'Vahiy',
        ipucu: 'İlahi bildirim',
        tanim: 'Yüce Allah’ın emir, yasak ve öğütlerini Cebrail (a.s.) aracılığıyla peygamberlerine bildirmesidir.',
        ornek: 'Kur’an-ı Kerim’in ilk vahyi Hira mağarasında "Oku!" emriyle başlamıştır.',
      },
      {
        id: 'u3-k8',
        kavram: 'Kevser',
        ipucu: 'Bol hayır ve nimet',
        tanim: 'Çokluk, bereket, bol hayır ve cennetteki özel bir nehrin adı anlamına gelir.',
        ornek: 'Kevser suresi bizlere sahip olduğumuz nimetler için şükretmeyi hatırlatır.',
      },
    ],
    sorular: [
      {
        id: 'u3-s1',
        soru: 'Kur’an-ı Kerim’in okunmasını kolaylaştırmak için ayrıldığı 20 sayfalık 30 eşit bölüme ne ad verilir?',
        secenekler: ['Ayet', 'Sure', 'Cüz', 'Kıssa'],
        dogruIndex: 2,
        aciklama:
          'Kur’an-ı Kerim 114 sureden ve her biri yaklaşık 20 sayfa olan 30 cüzden meydana gelir.',
      },
      {
        id: 'u3-s2',
        soru: 'Bir kişinin Kur’an-ı Kerim’i sesli okuması, diğer kişilerin ise gözleriyle mushaftan takip etmesi geleneğine ne denir?',
        secenekler: ['Tevhid', 'Mukabele', 'Teyemmüm', 'İhlas'],
        dogruIndex: 1,
        aciklama:
          'Cebrail (a.s.) ile Peygamberimizin Ramazan aylarında Kur’an’ı karşılıklı okumalarına dayanan bu geleneğe mukabele denir.',
      },
      {
        id: 'u3-s3',
        soru: '"Doğruluktan ayrılmayın, komşularınıza ve yetimlere yardım edin" öğüdü Kur’an-ı Kerim’in hangi ana konusuyla doğrudan ilgilidir?',
        secenekler: ['Ahlak', 'Kıssa', 'Cüz', 'Coğrafya'],
        dogruIndex: 0,
        aciklama:
          'Kur’an’ın dört ana konusu İnanç, İbadet, Ahlak ve Kıssalardır. Doğruluk, saygı ve yardımlaşma ahlak konuları arasındadır.',
      },
      {
        id: 'u3-s4',
        soru: 'Kur’an-ı Kerim’in en kısa suresi olan ve nimetlere karşı namaz kılıp kurban keserek şükretmemizi öğütleyen sure hangisidir?',
        secenekler: ['İhlas Suresi', 'Kureyş Suresi', 'Kevser Suresi', 'Fatiha Suresi'],
        dogruIndex: 2,
        aciklama:
          'Kevser suresi 3 ayetten oluşur ve Kur’an’ın en kısa suresidir; şükür olarak namaz ve kurbanı öğütler.',
      },
      {
        id: 'u3-s5',
        soru: 'Kur’an-ı Kerim’in ilk suresi ve son suresi aşağıdakilerden hangisinde doğru verilmiştir?',
        secenekler: [
          'Fatiha - Nas',
          'Bakara - İhlas',
          'Kevser - Kureyş',
          'Alak - Fatiha',
        ],
        dogruIndex: 0,
        aciklama:
          'Kur’an-ı Kerim’in mushaf sıralamasına göre ilk suresi Fatiha, son (114.) suresi ise Nas suresidir.',
      },
    ],
    rehberSorulari: [
      'Ayet, sure ve cüz arasındaki fark nedir?',
      'Kur’an-ı Kerim’in dört ana konusu nelerdir?',
      'Mukabele ve hatim kavramları ne anlama gelir?',
      'Kevser suresinden günlük hayatımız için ne ders çıkarabiliriz?',
    ],
  },
  {
    id: 'peygamber-kissalari',
    numara: 4,
    kisaAd: 'Peygamber Kıssaları',
    tamAd: '4. Ünite: Peygamber Kıssaları',
    englishTitle: 'Unit 4: Stories of the Prophets (Peygamber Kıssaları)',
    altBaslik: 'Kıssaların Amacı, Örnek Peygamber Hayatları ve Kureyş Suresi',
    kazanimlar: [
      'Kur’an-ı Kerim’de peygamber kıssalarına yer verilmesinin amacını açıklar.',
      'Hz. İbrahim, Hz. Musa ve Hz. Yusuf kıssalarından ahlaki ve inançla ilgili dersler çıkarır.',
      'Peygamberlerin sabır, doğruluk ve tevhid mücadelesindeki ortak özellikleri fark eder.',
      'Kureyş Suresi’ni okur, anlamını ve şükür bilincini açıklar.',
    ],
    konular: [
      {
        baslik: 'Kıssa Nedir ve Neden Anlatılır?',
        ozet: 'Kur’an-ı Kerim’de geçmiş peygamberlerin ve toplumların başından geçen gerçek ve ibret verici olaylara kıssa denir. Kıssalar sadece tarihi bilgi vermez; bize zorluklar karşısında sabırlı olmayı, doğruluktan şaşmamayı ve yalnızca Allah’a güvenmeyi öğretir.',
        ornek: 'Bir zorluk yaşadığımızda peygamberlerin sabrını hatırlamak bize güç ve umut verir.',
      },
      {
        baslik: 'Hz. İbrahim ve Hz. Musa Kıssalarından Dersler',
        ozet: 'Hz. İbrahim (a.s.) aklını kullanarak putların ilah olamayacağını göstermiş, insanları tek olan Allah’a (tevhid) çağırmıştır. Hz. Musa (a.s.) ise Firavun’un haksızlıkları karşısında adaleti ve hakikati savunmuş, Allah’a güvenerek mücadelesini sürdürmüştür.',
        ornek: 'Hz. İbrahim’in yıldızları, ayı ve güneşi gözlemleyip gerçeği araması aklımızı kullanmamız gerektiğini gösterir.',
      },
      {
        baslik: 'Hz. Yusuf Kıssası: Sabır ve Affedicilik',
        ozet: 'Hz. Yusuf (a.s.) çocukken kardeşleri tarafından kuyuya atılmış, ardından haksız yere hapse girmiştir. Ancak sabrını ve dürüstlüğünü hiç kaybetmemiş, Mısır’da önemli bir yönetici olduğunda kendisine kötülük yapan kardeşlerini affetmiştir.',
        ornek: 'Bize hata yapan bir arkadaşımızı affetmek ve kin tutmamak Hz. Yusuf’tan öğrendiğimiz en güzel davranışlardandır.',
      },
    ],
    sureDua: {
      ad: 'Kureyş Suresi',
      tur: 'Sure',
      ozellik:
        'Kur’an-ı Kerim’in 106. suresidir ve 4 ayetten oluşur. Mekke halkına verilen güven ve geçim nimetlerini hatırlatır.',
      okunusu: [
        '1. Li îlâfi Kureyş.',
        '2. Îlâfihim rıhleteş-şitâi ves-sayf.',
        '3. Felya’büdû rabbe hâzel-beyt.',
        '4. Ellezî et’amehüm min cûin ve âmenehüm min havf.',
      ],
      anlami: [
        '1. Kureyş’i (ticaret yolculuklarına) alıştırıp ısındırdığı için,',
        '2. Onları kış (Yemen) ve yaz (Şam) yolculuklarına alıştırdığı için,',
        '3. Bu Beyt’in (Kâbe’nin) Rabbine kulluk etsinler.',
        '4. O Rab ki, onları açlıktan kurtarıp doyurdu ve korkudan emin (güvende) kıldı.',
      ],
      mesaj:
        'Kureyş suresi, sahip olduğumuz rızık ve güvenlik nimetlerinin Yüce Allah’ın bir lütfu olduğunu hatırlatarak yalnızca O’na kulluk etmemizi öğütler.',
    },
    kavramlar: [
      {
        id: 'u4-k1',
        kavram: 'Kıssa',
        ipucu: 'İbret verici gerçek olay',
        tanim: 'Kur’an-ı Kerim’de geçmiş peygamberler ve toplumlar hakkında anlatılan ders ve öğüt dolu gerçek hayat hikâyeleridir.',
        ornek: 'Kur’an’da "kıssaların en güzeli" olarak Hz. Yusuf kıssası anılır.',
      },
      {
        id: 'u4-k2',
        kavram: 'Peygamber (Nebi / Resul)',
        ipucu: 'Allah’ın elçisi',
        tanim: 'Yüce Allah’ın insanlara doğru yolu göstermek ve vahiy bildirmek için insanlar arasından seçtiği örnek elçilerdir.',
        ornek: 'Bütün peygamberler insanları tek olan Allah’a inanmaya ve güzel ahlaka çağırmıştır.',
      },
      {
        id: 'u4-k3',
        kavram: 'Tevekkül',
        ipucu: 'Çaba + Güven',
        tanim: 'Üzerimize düşen bütün görevleri ve tedbirleri yerine getirdikten sonra sonucunu Yüce Allah’a bırakıp O’na güvenmektir.',
        ornek: 'Hz. Musa’nın elinden geleni yaptıktan sonra Allah’ın yardımına güvenmesi tevekküle örnektir.',
      },
      {
        id: 'u4-k4',
        kavram: 'Sabır',
        ipucu: 'Zorlukta direnç',
        tanim: 'Karşılaşılan sıkıntılar ve haksızlıklar karşısında umudu kaybetmeden doğru yolda sebat etmektir.',
        ornek: 'Hz. Yusuf’un kuyuya atıldığında ve zindanda yaşadığı sabır en büyük örneklerdendir.',
      },
      {
        id: 'u4-k5',
        kavram: 'Hz. İbrahim (a.s.)',
        ipucu: 'Tevhid mücadelesi',
        tanim: 'Aklını kullanarak putperestliğe karşı çıkan ve tevhid inancını savunan, Kâbe’yi oğlu Hz. İsmail ile inşa eden peygamberdir.',
        ornek: 'Çevresindeki doğa olaylarını gözlemleyerek tek yaratıcıyı bulması aklın önemini gösterir.',
      },
      {
        id: 'u4-k6',
        kavram: 'Hz. Yusuf (a.s.)',
        ipucu: 'Affedicilik ve iffet',
        tanim: 'Kardeşlerinin yaptığı kötülüğe rağmen sabreden ve güce kavuştuğunda onları bağışlayan peygamberdir.',
        ornek: 'Kendisine hata yapanları affetmesi büyük bir olgunluk ve erdem örneğidir.',
      },
      {
        id: 'u4-k7',
        kavram: 'Sıdk (Doğruluk)',
        ipucu: 'Peygamber sıfatı',
        tanim: 'Sözde, özde ve davranışta dürüst olmak; asla yalan söylememektir.',
        ornek: 'Tüm peygamberler yaşadıkları toplumlarda güvenilir ve doğru sözlü insanlar olarak tanınmıştır.',
      },
      {
        id: 'u4-k8',
        kavram: 'Kâbe (Beytullah)',
        ipucu: 'Kureyş suresindeki "Beyt"',
        tanim: 'Mekke’de bulunan, Müslümanların kıblesi olan kutsal mescittir.',
        ornek: 'Kureyş suresinde "Bu Beyt’in Rabbine kulluk etsinler" ifadesiyle Kâbe kastedilir.',
      },
    ],
    sorular: [
      {
        id: 'u4-s1',
        soru: 'Kur’an-ı Kerim’de peygamber kıssalarına yer verilmesinin temel amacı aşağıdakilerden hangisidir?',
        secenekler: [
          'Sadece eski masalları aktarmak',
          'İnsanların ibret ve ders alarak doğru yolu bulmasını sağlamak',
          'Yalnızca coğrafya bilgisi öğretmek',
          'Eski dillerin kurallarını anlatmak',
        ],
        dogruIndex: 1,
        aciklama:
          'Peygamber kıssaları; sabır, tevhid, adalet ve doğruluk gibi değerleri yaşanmış örneklerle öğreterek insanlara rehberlik eder.',
      },
      {
        id: 'u4-s2',
        soru: 'Yıldızları, ayı ve güneşi gözlemleyip batıp kaybolduklarını görünce bunların ilah olamayacağını fark eden peygamber kimdir?',
        secenekler: ['Hz. Yusuf (a.s.)', 'Hz. Musa (a.s.)', 'Hz. İbrahim (a.s.)', 'Hz. Nuh (a.s.)'],
        dogruIndex: 2,
        aciklama:
          'Hz. İbrahim (a.s.) aklını ve gözlemini kullanarak gök cisimlerinin de yaratılmış olduğunu fark etmiş ve tek Allah’a yönelmiştir.',
      },
      {
        id: 'u4-s3',
        soru: 'Kardeşleri tarafından kuyuya atılmasına rağmen sabrını koruyan ve yıllar sonra onları affeden peygamber aşağıdakilerden hangisidir?',
        secenekler: ['Hz. Yusuf (a.s.)', 'Hz. Davud (a.s.)', 'Hz. Salih (a.s.)', 'Hz. Yunus (a.s.)'],
        dogruIndex: 0,
        aciklama:
          'Hz. Yusuf (a.s.) kıssası bize zorluklar karşısında sabretmeyi, dürüstlükten ayrılmamayı ve affedici olmayı öğretir.',
      },
      {
        id: 'u4-s4',
        soru: 'Kureyş Suresi’nde Mekke halkına verilen hangi iki büyük nimet özellikle vurgulanmaktadır?',
        secenekler: [
          'Altın ve gümüş madenleri',
          'Açlıktan kurtarıp doyurma (rızık) ve korkudan emin kılma (güvenlik)',
          'Büyük saraylar ve bahçeler',
          'Yağmur ve kar yağışı',
        ],
        dogruIndex: 1,
        aciklama:
          'Kureyş suresinin 4. ayetinde "Onları açlıktan doyuran ve korkudan güvene kavuşturan" Rabbe kulluk edilmesi emredilir.',
      },
      {
        id: 'u4-s5',
        soru: 'Elinden gelen bütün tedbirleri aldıktan sonra sonucu Yüce Allah’a bırakıp O’na güvenmeye ne ad verilir?',
        secenekler: ['Tevekkül', 'Hatim', 'Kıraat', 'Kamet'],
        dogruIndex: 0,
        aciklama:
          'Tevekkül tembellik değildir; gerekli tüm çabayı gösterdikten sonra Allah’ın yardımına güvenmektir.',
      },
    ],
    rehberSorulari: [
      'Kur’an’da peygamber kıssaları neden anlatılır?',
      'Hz. İbrahim kıssasından aklımızı kullanmakla ilgili ne öğreniriz?',
      'Hz. Yusuf’un kardeşlerini affetmesi bize ne öğretir?',
      'Kureyş suresinde hangi nimetlere dikkat çekilir?',
    ],
  },
  {
    id: 'mimarimizde-din',
    numara: 5,
    kisaAd: 'Mimarimizde Din',
    tamAd: '5. Ünite: Mimarimizde Din',
    englishTitle: 'Unit 5: Religion in Our Architecture (Mimarimizde Din)',
    altBaslik: 'Cami ve Bölümleri, Külliye Geleneği ve Rabbena Duaları',
    kazanimlar: [
      'İslam medeniyetinin şehir ve mimari anlayışına etkisini örneklerle açıklar.',
      'Caminin temel bölümlerini (mihrap, minber, kürsü, şadırvan, minare, kubbe) işlevleriyle tanır.',
      'Külliye, medrese, şifahane, imarethane ve sebil yapılarının toplumsal dayanışmadaki rolünü kavrar.',
      'Rabbena Dualarının okunuşunu ve anlamını öğrenir.',
    ],
    konular: [
      {
        baslik: 'Kültürümüzde Dinin Mimariye Yansıması',
        ozet: 'Türk-İslam şehirleri cami merkezli bir anlayışla kurulmuştur. Mimar Sinan’ın ustalık eseri olan Edirne Selimiye Camii ve İstanbul Süleymaniye Camii ile Bursa Ulu Camii, taş işçiliği, hat sanatı ve çinileriyle inancın estetiğe dönüşmüş hâlidir.',
        ornek: 'Camilerin geniş pencereleri ve yüksek kubbeleri içeriye huzur ve ferahlık veren bir ışık düzeni sağlar.',
      },
      {
        baslik: 'Cami ve Temel Bölümleri',
        ozet: 'Camide cemaate kıbleyi gösteren girintiye mihrap, Cuma hutbesi okunan merdivenli yapıya minber, vaaz verilen yere kürsü denir. Avludaki abdest alma yerine şadırvan, ezan okunan kuleye ise minare adı verilir.',
        ornek: 'Ezan sesinin uzaklara ulaşması için minareler yüksek ve zarif bir şekilde inşa edilmiştir.',
      },
      {
        baslik: 'Dayanışma Yapıları: Külliye ve Vakıf Eserleri',
        ozet: 'Merkezinde cami bulunan ve etrafında eğitim, sağlık, yardımlaşma yapılarının yer aldığı binalar topluluğuna külliye denir. Külliyelerde okul olarak medrese, hastane olarak şifahane, aşevi olarak imarethane ve su ikramı için sebil bulunur.',
        ornek: 'Sokak köşelerindeki sebiller ve cami duvarlarındaki kuş evleri merhamet kültürümüzün mimari göstergeleridir.',
      },
    ],
    mimariOgeler: [
      {
        id: 'arch-mihrap',
        ad: 'Mihrap',
        kategori: 'İç Mekân',
        tanim: 'Caminin kıble (Kâbe) yönündeki duvarında bulunan girintili bölümdür.',
        islev: 'İmam cemaate namaz kıldırırken mihrapta durur; cemaat kıble yönünü buradan anlar.',
      },
      {
        id: 'arch-minber',
        ad: 'Minber',
        kategori: 'İç Mekân',
        tanim: 'Mihrabın sağ tarafında yer alan, merdivenli ve yüksekçe yapıdır.',
        islev: 'İmam Cuma ve Bayram namazlarında cemaate hitap ettiği hutbeyi minberden okur.',
      },
      {
        id: 'arch-kursu',
        ad: 'Vaaz Kürsüsü',
        kategori: 'İç Mekân',
        tanim: 'Cami içinde din görevlisinin cemaate sohbet ve ders verdiği yüksek oturma yeridir.',
        islev: 'Namaz vakitlerinden önce dini ve ahlaki konularda vaaz verilmesini sağlar.',
      },
      {
        id: 'arch-kubbe',
        ad: 'Kubbe',
        kategori: 'İç Mekân',
        tanim: 'Caminin üstünü örten yarım küre biçimindeki mimari örtüdür.',
        islev: 'İç mekâna ferahlık katar, sesi akustiğiyle tüm cemaate dengeli şekilde ulaştırır.',
      },
      {
        id: 'arch-sadirvan',
        ad: 'Şadırvan',
        kategori: 'Dış Mekân',
        tanim: 'Genellikle cami avlusunun ortasında yer alan, çok musluklu su yapısıdır.',
        islev: 'Cemaatin namaza hazırlanırken rahatça abdest almasını sağlar ve avluya serinlik verir.',
      },
      {
        id: 'arch-minare',
        ad: 'Minare',
        kategori: 'Dış Mekân',
        tanim: 'Camiye bitişik inşa edilen, şerefeli yüksek kule yapısıdır.',
        islev: 'Günde beş vakit namaz vaktinin geldiğini duyuran ezanın uzaklara ulaşmasını sağlar.',
      },
      {
        id: 'arch-kulliye',
        ad: 'Külliye & Medrese',
        kategori: 'Külliye Yapısı',
        tanim: 'Cami merkezli olarak etrafına inşa edilen eğitim ve sosyal yardım yapıları topluluğudur.',
        islev: 'Medreselerde öğrenciler ücretsiz eğitim görür, toplumun bilgi ve kültür düzeyi yükselirdi.',
      },
      {
        id: 'arch-sifahane',
        ad: 'Şifahane & İmarethane',
        kategori: 'Külliye Yapısı',
        tanim: 'Külliyelerin içinde yer alan sağlık (şifahane) ve aşevi (imarethane) birimleridir.',
        islev: 'Hastalar tedavi edilir, yolculara ve ihtiyaç sahiplerine her gün sıcak yemek ikram edilirdi.',
      },
    ],
    sureDua: {
      ad: 'Rabbena Duaları',
      tur: 'Dua',
      ozellik:
        'Namazların son oturuşunda Tahiyyat ve Salli-Barik dualarından sonra okunan, Kur’an-ı Kerim kaynaklı iki kısa duadır.',
      okunusu: [
        '1. Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhireti haseneten ve kınâ azâben-nâr.',
        '2. Rabbenağfirlî ve li-vâlideyye ve lil-mü’minîne yevme yekûmül-hısâb.',
      ],
      anlami: [
        '1. Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.',
        '2. Rabbimiz! Hesap görülecek günde beni, anne-babamı ve bütün müminleri bağışla.',
      ],
      mesaj:
        'Rabbena duaları; sadece kendimiz için değil anne-babamız ve tüm inananlar için de hem dünyada hem ahirette iyilik dilemeyi öğretir.',
    },
    kavramlar: [
      {
        id: 'u5-k1',
        kavram: 'Mihrap',
        ipucu: 'Kıble yönündeki girinti',
        tanim: 'Camilerde kıble duvarında bulunan ve imamın namaz kıldırırken önünde durduğu oyuk bölümdür.',
        ornek: 'Camiye girdiğimizde hangi yöne dönüp namaz kılacağımızı mihraba bakarak anlarız.',
      },
      {
        id: 'u5-k2',
        kavram: 'Minber',
        ipucu: 'Hutbe okunan merdivenli yer',
        tanim: 'Cuma ve Bayram namazlarında imamın çıkıp hutbe okuduğu basamaklı yüksek yapıdır.',
        ornek: 'Ahşap veya mermer oymacılığının en güzel örnekleri cami minberlerinde görülür.',
      },
      {
        id: 'u5-k3',
        kavram: 'Şadırvan',
        ipucu: 'Avludaki abdest yeri',
        tanim: 'Cami avlularında ortada bulunan, çevresinde oturma taşları ve muslukları yer alan su yapısıdır.',
        ornek: 'Namaz vaktinden önce avluya girip şadırvanda abdest alırız.',
      },
      {
        id: 'u5-k4',
        kavram: 'Minare ve Şerefe',
        ipucu: 'Ezan okunan yüksek kule',
        tanim: 'Ezan okumak için cami yanında yükselen kuleye minare, müezzinin çıktığı balkon kısmına ise şerefe denir.',
        ornek: 'Selimiye Camii, üç şerefeli dört zarif minaresiyle ünlüdür.',
      },
      {
        id: 'u5-k5',
        kavram: 'Külliye',
        ipucu: 'Cami merkezli yapılar bütünü',
        tanim: 'Merkezinde cami olan; medrese, şifahane, imarethane, kütüphane ve hamam gibi yapıları bir arada barındıran komplekstir.',
        ornek: 'İstanbul’daki Süleymaniye Külliyesi eğitim, sağlık ve ibadeti bir araya getiren bir merkezdir.',
      },
      {
        id: 'u5-k6',
        kavram: 'Şifahane (Darüşşifa)',
        ipucu: 'Külliyedeki sağlık merkezi',
        tanim: 'Hastaların ücretsiz tedavi edildiği, müzik ve su sesiyle bile terapi yapılan tarihi hastane yapılarıdır.',
        ornek: 'Edirne’deki II. Bayezid Darüşşifası döneminin en gelişmiş şifahanelerindendir.',
      },
      {
        id: 'u5-k7',
        kavram: 'Sebil ve Çeşme',
        ipucu: 'Hayrat su yapıları',
        tanim: 'Yoldan geçen insanlara karşılık beklemeden su ve şerbet ikram edilen hayır yapılarıdır.',
        ornek: 'Atalarımız canlılara merhamet göstergesi olarak mahalle başlarına sebiller yaptırmıştır.',
      },
      {
        id: 'u5-k8',
        kavram: 'Vaaz Kürsüsü',
        ipucu: 'Sohbet ve eğitim noktası',
        tanim: 'Camilerde din görevlisinin oturarak cemaati bilgilendirdiği yüksekçe kürsüdür.',
        ornek: 'Cuma namazından önce hoca kürsüden yardımlaşma konusunda sohbet eder.',
      },
    ],
    sorular: [
      {
        id: 'u5-s1',
        soru: 'Camide imamın Cuma ve Bayram namazlarında hutbe okumak için çıktığı merdivenli bölüme ne ad verilir?',
        secenekler: ['Mihrap', 'Şadırvan', 'Minber', 'Kubbe'],
        dogruIndex: 2,
        aciklama:
          'Hutbe minberde okunur. Mihrap imamın namaz kıldırdığı kıble yönündeki girinti, şadırvan ise abdest alınan yerdir.',
      },
      {
        id: 'u5-s2',
        soru: 'Merkezinde cami bulunan ve çevresinde medrese, şifahane, imarethane ve kütüphane gibi yapıları barındıran binalar topluluğuna ne denir?',
        secenekler: ['Külliye', 'Kervansaray', 'Minare', 'Kürsü'],
        dogruIndex: 0,
        aciklama:
          'Külliye, ibadetle birlikte eğitim, sağlık ve yardımlaşma hizmetlerinin bir arada sunulduğu mimari bütündür.',
      },
      {
        id: 'u5-s3',
        soru: 'Aşağıdaki mimari eserlerden hangisi yoldan geçenlere ücretsiz su ikram etmek amacıyla yapılmış bir hayır yapısıdır?',
        secenekler: ['Minber', 'Sebil', 'Mihrap', 'Kürsü'],
        dogruIndex: 1,
        aciklama:
          'Sebiller, hayırseverler tarafından insanların susuzluğunu gidermek için yaptırılan zarif su dağıtım yapılarıdır.',
      },
      {
        id: 'u5-s4',
        soru: 'Mimar Sinan’ın "ustalık eserim" dediği ve Edirne’de bulunan ünlü mimari şaheser aşağıdakilerden hangisidir?',
        secenekler: [
          'Bursa Ulu Camii',
          'Selimiye Camii',
          'Divriği Ulu Camii',
          'Sultanahmet Camii',
        ],
        dogruIndex: 1,
        aciklama:
          'Edirne Selimiye Camii, Mimar Sinan’ın 80 yaşında tamamladığı ve "ustalık eserim" olarak nitelediği başyapıtıdır.',
      },
      {
        id: 'u5-s5',
        soru: 'Rabbena Duaları okunurken Yüce Allah’tan kimler için bağışlanma ve iyilik dilenir?',
        secenekler: [
          'Sadece kişinin kendisi için',
          'Kendimiz, anne-babamız ve bütün müminler için',
          'Yalnızca yolculuğa çıkanlar için',
          'Sadece cami görevlileri için',
        ],
        dogruIndex: 1,
        aciklama:
          'Rabbena duaları hem dünya hem ahiret iyiliği ister; ikinci duada ise kendimiz, anne-babamız ve tüm müminler için bağışlanma dilenir.',
      },
    ],
    rehberSorulari: [
      'Caminin içindeki mihrap, minber ve kürsü ne işe yarar?',
      'Külliye ne demektir ve içinde hangi yapılar bulunur?',
      'Mimar Sinan’ın Selimiye ve Süleymaniye camilerinin önemi nedir?',
      'Rabbena dualarının günlük hayatımıza verdiği mesaj nedir?',
    ],
  },
];

export function getUnitById(id: UnitId): UnitData {
  return MEB_UNITS.find((u) => u.id === id) ?? MEB_UNITS[0];
}
