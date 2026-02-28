import img7508 from "../assets/images/IMG_7508.webp";
import img7509 from "../assets/images/IMG_7509.webp";
import img7510 from "../assets/images/IMG_7510.webp";
import del1 from "../assets/images/518354740_1356748536133668_1537036633555395839_n.webp";
import del2 from "../assets/images/520327181_1356644202810768_3359533342953354306_n.webp";
import del3 from "../assets/images/521008990_1357155082759680_266049088416494662_n.webp";
import del4 from "../assets/images/527224258_1369000494908472_6770609366300285063_n.webp";
import del5 from "../assets/images/534597078_1379261157215739_4765641842671221225_n.webp";
import del6 from "../assets/images/534633544_1380203383788183_423890981387154358_n.webp";
import del7 from "../assets/images/535920017_1382860176855837_5397091415575020861_n.webp";
import del8 from "../assets/images/536277688_1391181682690353_430960558036038701_n.webp";
import del9 from "../assets/images/549571249_1410725507402637_3770870615834480586_n.webp";
import del10 from "../assets/images/558304431_1427933749015146_1638164802735735501_n.webp";
import del11 from "../assets/images/handover-11.webp";
import del12 from "../assets/images/handover-12.webp";
import type {
  CarouselImageItem,
  EverestTrendOffer,
  FaqItem,
  FeatureItem,
  FordModel,
  NavItem,
  OtherModel,
  StatItem,
  Testimonial,
} from "./types";

export const NAV: NavItem[] = [
  { id: "offers", label: "โปรฯ Everest" },
  { id: "models", label: "รุ่นอื่นๆ" },
  { id: "test-drive", label: "จองทดลองขับ" },
  { id: "features", label: "จุดเด่น" },
  { id: "calculator", label: "คำนวณค่างวด" },
  { id: "reviews", label: "รีวิว" },
  { id: "contact", label: "ติดต่อ" },
];

export const STATS: StatItem[] = [
  { value: "200+", label: "คันที่ส่งมอบแล้ว" },
  { value: "5★", label: "คะแนนรีวิวเฉลี่ย" },
  { value: "<5 นาที", label: "ตอบกลับใน" },
  { value: "10+", label: "ปีประสบการณ์" },
];

export const OTHER_MODELS: OtherModel[] = [
  {
    name: "Ford Ranger XLS 2.0L",
    badge: "Ranger",
    tagline: "กระบะ 4 ประตู ดุดัน พร้อมทุกเส้นทาง ราคาเริ่มต้น 814,000 บาท",
    normalPrice: "814,000",
    specialPrice: "814,000",
    save: "ติดต่อสอบถาม",
    highlights: ["2.0L Turbo 170 แรงม้า", "เกียร์อัตโนมัติ 6 สปีด 4x2", "SYNC 4A 10.1\" Apple CarPlay", "ล้ออัลลอย 17\" ถุงลม 6 จุด"],
    color: "from-emerald-600 to-teal-500",
  },
  {
    name: "Ford Ranger Raptor V6 3.0L",
    badge: "Raptor",
    tagline: "สุดยอดสมรรถนะ V6 EcoBoost® เทอร์โบคู่ 397 แรงม้า ราคาเริ่มต้น 1,804,000 บาท",
    normalPrice: "1,804,000",
    specialPrice: "1,804,000",
    save: "ติดต่อสอบถาม",
    highlights: ["V6 3.0L EcoBoost® 397 แรงม้า", "4WD เกียร์อัตโนมัติ 10 สปีด", "โช้ค FOX 2.5\" Live Valve", "ยาง BFGoodrich K02 285/70 R17"],
    color: "from-orange-600 to-red-500",
  },
  {
    name: "Ford Ranger Wildtrak",
    badge: "Wildtrak",
    tagline: "ออฟโร้ดระดับพรีเมียม ครบครัน ราคาเริ่มต้น 1,534,000 บาท",
    normalPrice: "1,534,000",
    specialPrice: "1,534,000",
    save: "ติดต่อสอบถาม",
    highlights: ["2.0L Turbo / V6 3.0L 4WD", "SYNC 4A 12\" Apple CarPlay", "ถุงลม 7 จุด + ชาร์จไร้สาย", "ฝาท้าย Easy Lift + ช่อง 230V"],
    color: "from-blue-700 to-cyan-500",
  },
  {
    name: "Ford Ranger Sport 4x4",
    badge: "Sport",
    tagline: "สปอร์ตสุด 4x4 6 โหมดขับขี่ ราคาเริ่มต้น 1,089,000 บาท",
    normalPrice: "1,089,000",
    specialPrice: "1,089,000",
    save: "ติดต่อสอบถาม",
    highlights: ["2.0L Turbo 170 แรงม้า 4x4", "SYNC 4A 10.1\" Apple CarPlay", "6 โหมดขับขี่ + สตาร์ทไร้กุญแจ", "ชุดแต่งสปอร์ต ฝาท้าย Easy Lift"],
    color: "from-violet-700 to-purple-500",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "คุณสมชาย", role: "เจ้าของธุรกิจ", car: "Everest Trend", rating: 5, text: "นินดาช่วยดูแลเรื่องไฟแนนซ์ทุกขั้นตอน ตั้งแต่เช็กเครดิตยันรับรถ ติดต่อง่าย ตอบไว ประทับใจมากครับ" },
  { name: "คุณมินตรา", role: "พยาบาล", car: "Ranger XLS", rating: 5, text: "ถามเรื่องดาวน์เยอะมาก นินดาตอบทุกคำถามอย่างละเอียด ได้ราคาและของแถมที่พอใจ จะแนะนำเพื่อนต่อแน่นอนค่ะ" },
  { name: "คุณวิชัย", role: "ผู้รับเหมา", car: "Ranger Raptor", rating: 5, text: "ซื้อ Raptor ผ่านนินดา ได้โปรพิเศษที่ดีกว่าโชว์รูมหลายหมื่น อัปเดตสถานะตลอด รับรถเร็วกว่าที่คิด 2 สัปดาห์ครับ" },
];

export const FAQS: FaqItem[] = [
  { q: "ต้องใช้เอกสารอะไรบ้างในการยื่นไฟแนนซ์?", a: "พนักงานประจำ: บัตรประชาชน + สลิปเงินเดือน 1-3 เดือน + statement 3-6 เดือน\nเจ้าของกิจการ: บัตรประชาชน + ทะเบียนพาณิชย์ + statement 6 เดือน" },
  { q: "ดาวน์ขั้นต่ำเท่าไหร่?", a: "โดยทั่วไปอยู่ที่ 15-20% ขึ้นอยู่กับโปรแกรมไฟแนนซ์แต่ละเดือน บางแคมเปญอาจดาวน์ต่ำกว่านั้นได้ ทักมาคุยเพื่อหาตัวเลขที่เหมาะกับงบได้เลย" },
  { q: "ซื้อผ่านนินดาต่างจากไปซื้อที่โชว์รูมโดยตรงอย่างไร?", a: "นินดาช่วยทำข้อเสนอเฉพาะบุคคล ดูแลเรื่องเอกสาร ติดตามสถานะรถ และช่วยเจรจาของแถมและโปรพิเศษที่อาจไม่ได้ประกาศทั่วไป" },
  { q: "รอรถนานไหม?", a: "บางรุ่นมีสต๊อกพร้อมส่งทันที บางรุ่นรอ 4-8 สัปดาห์ ทักมาเช็กสต๊อกก่อนได้เลยค่ะ" },
  { q: "ทดลองขับได้ไหม?", a: "ได้เลยค่ะ! ทักนัดวันเวลาที่สะดวก นินดาจะจัดรถทดลองขับให้ถึงที่ หรือนัดที่โชว์รูมก็ได้" },
  { q: "ซื้อรถใหม่ต้องเสียภาษีอะไรบ้าง?", a: "รถใหม่ป้ายแดงเสียภาษีสรรพสามิตและภาษีแสตมป์รถยนต์ ชำระครั้งเดียว (รวมท้ายอยู่ในราคาโครงผู้ผลิตแล้ว) มีค่าโอน ค่าจดทะเบียน และค่าประกันภัยแยกต่างหาก ทักมาถามรายละเอียดได้ค่ะ" },
  { q: "ผ่อนได้นานแค่ไหน?", a: "โดยทั่วไปอยู่ที่ 48-84 งวด (4-7 ปี) ขึ้นอยู่กับโปรแกรมไฟแนนซ์แต่ละรอบ ผ่อนนานกว่า ค่างวดลดลง แต่ดอกเบี้ยรวมสูงขึ้น นินดาจะช่วยวิเคราะห์ว่าเหมาะกับคุณที่สุดค่ะ" },
];

export const FEATURE_DATA: FeatureItem[] = [
  {
    title: "ข้อเสนอชัดเจน ตรงงบ",
    desc: "คุยงบ/ดาวน์/ผ่อนต่อเดือนให้เหมาะกับคุณ พร้อมอธิบายเงื่อนไขแบบเข้าใจง่าย",
  },
  {
    title: "ดูแลเอกสารไฟแนนซ์",
    desc: "ช่วยเช็กเอกสารและเตรียมขั้นตอนยื่นไฟแนนซ์ ลดการตีกลับและประหยัดเวลา",
  },
  {
    title: "นัดดูรถ/ทดลองขับได้ไว",
    desc: "ทัก Inbox แล้วนัดวันเวลาได้ทันที พร้อมแนะนำรุ่น/ออปชันที่คุ้มที่สุด",
  },
  {
    title: "ติดตามส่งมอบ & หลังการขาย",
    desc: "อัปเดตสถานะรถ/วันรับรถ และดูแลหลังส่งมอบให้สบายใจตลอดการใช้งาน",
  },
];

export const EVEREST_TREND_OFFER: EverestTrendOffer = {
  name: "Ford Everest Trend 2.0L Turbo 4x2 6AT",
  normalPrice: "1,397,000",
  specialPrice: "1,249,000",
  save: "148,000",
  note: "ราคาพิเศษเมื่อจัดไฟแนนซ์ผ่าน Ford Leasing (ไม่รวมประกันภัยชั้นหนึ่ง) พร้อมโปรแกรม Ford Care*",
  offerUrl: "https://www.ford.co.th/showroom/all-offers/ford-everest-2-0l-turbo-trend-4x2-6at/",
  allOffersUrl: "https://www.ford.co.th/showroom/all-offers/",
};

export const EVEREST_TREND_IMAGES: CarouselImageItem[] = [
  { src: img7508, caption: "Everest Trend — มุมเฉียง (โชว์เส้นสาย/ล้อ/ทรงรถ)" },
  { src: img7509, caption: "Everest Trend — มุมหน้าเต็ม (กระจัง/ไฟหน้า)" },
  { src: img7510, caption: "Everest Trend — มุมด้านข้าง (สัดส่วน/พื้นที่ห้องโดยสาร)" },
];

export const DELIVERY_IMAGES = [
  del1, del2, del3, del4, del5, del6, del7, del8, del9, del10, del11, del12,
];

export const FORD_MODELS: FordModel[] = [
  { name: "Everest 2.0L Turbo Trend 4x2 6AT", price: 1397000 },
  { name: "Everest 2.0L Turbo Sport 4x2 6AT", price: 1527000 },
  { name: "Everest 2.0L Turbo Sport 4x2 6AT (Special Edition)", price: 1619000 },
  { name: "Everest 2.0L Bi-Turbo Titanium+ 4x2 10AT", price: 1767000 },
  { name: "Everest 2.0L Bi-Turbo Titanium+ 4x4 10AT", price: 1917000 },
  { name: "Everest 2.0L Bi-Turbo Wildtrak 4x4 10AT", price: 1942000 },
  { name: "Everest 3.0L V6 Turbo Platinum 4WD 10AT", price: 2284000 },
  { name: "Ranger Standard Cab XL 2.0L Turbo 4x4 6MT", price: 732000 },
  { name: "Ranger Open Cab XL+ 2.0L Turbo HR 6MT", price: 734000 },
  { name: "Ranger Open Cab XLS 2.0L Turbo HR 6AT", price: 814000 },
  { name: "Ranger Double Cab XLS 2.0L Turbo HR 6AT", price: 924000 },
  { name: "Ranger Double Cab XLS 2.0L Turbo HR 6AT (Extra Pack)", price: 934000 },
  { name: "Ranger SWB 2.0L Bi-turbo 4x4 10AT", price: 919000 },
  { name: "Ranger Double Cab Sport 2.0L Turbo HR 6AT", price: 999000 },
  { name: "Ranger Double Cab Sport 2.0L Turbo 4x4 6AT", price: 1089000 },
  { name: "Ranger Double Cab Wildtrak 2.0L Turbo HR 6AT", price: 1094000 },
  { name: "Ranger Double Cab Wildtrak 2.0L Turbo HR 6AT (Extra Pack)", price: 1104000 },
  { name: "Ranger Double Cab Wildtrak 3.0L V6 Turbo 4WD 10AT", price: 1534000 },
  { name: "Ranger Double Cab Stormtrak 2.0L Bi-Turbo HR 10AT", price: 1294000 },
  { name: "Ranger Double Cab Stormtrak 2.0L Bi-Turbo 4x4 10AT", price: 1429000 },
  { name: "Ranger Double Cab Raptor 2.0L Bi-Turbo 4WD 10AT", price: 1804000 },
  { name: "Ranger Double Cab Raptor 3.0L V6 Twin-Turbo EcoBoost 4WD 10AT", price: 1984000 },
];
