export type KhatType = {
  id: string;
  name: 'الأرحبي' | 'الصعدي' | 'العنسي' | 'همداني';
  price: number;
  description: string;
};

export type Governorate = {
  id: string;
  name: string;
  markets: { id: string; name: string }[];
};

export const governorates: Governorate[] = [
  { 
    id: 'sanaa', 
    name: 'صنعاء', 
    markets: [
      { id: 'bab-al-yemen', name: 'سوق باب اليمن' },
      { id: 'shamlan', name: 'سوق شملان' },
    ] 
  },
  { 
    id: 'aden', 
    name: 'عدن', 
    markets: [
      { id: 'crater', name: 'سوق كريتر' },
    ] 
  },
  {
    id: 'hadhramaut',
    name: 'حضرموت',
    markets: [
        { id: 'seiyun', name: 'سوق سيئون' }
    ]
  }
];


export type Product = {
  id: string;
  name: string;
  category: 'قات' | 'ملحقات';
  price: number; // Keep a base price for accessories or general display
  description: string;
  vendor: string;
  images: string[];
  rating: number;
  reviews: number;
  dataAiHint: string;
  governorateId: string; 
  marketId: string; 
  khatTypes?: KhatType[];
};

export const products: Product[] = [
  {
    id: '1',
    name: 'قات أرحبي فاخر',
    category: 'قات',
    price: 15000,
    description: 'تشكيلة فاخرة من أوراق القات الأرحبي الطازجة، تتميز بجودتها العالية وتأثيرها المميز. من أشهر مزارع أرحب.',
    vendor: 'مزارع السعيد',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.8,
    reviews: 120,
    dataAiHint: 'green leaves',
    governorateId: 'sanaa',
    marketId: 'bab-al-yemen',
    khatTypes: [
      { id: '1-1', name: 'الأرحبي', price: 15000, description: 'أوراق مختارة بعناية من منطقة أرحب.' },
      { id: '1-2', name: 'همداني', price: 12000, description: 'نوعية ممتازة من همدان.' },
    ],
  },
  {
    id: '2',
    name: 'مداعة تقليدية',
    category: 'ملحقات',
    price: 8000,
    description: 'مداعة تقليدية مصنوعة بحرفية من الخشب المحلي وتتميز بنقوش معقدة. مثالية لتجربة سلسة.',
    vendor: 'حرفيين صنعاء',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.6,
    reviews: 85,
    dataAiHint: 'hookah pipe',
    governorateId: 'sanaa',
    marketId: 'bab-al-yemen',
  },
  {
    id: '3',
    name: 'قات صعدي',
    category: 'قات',
    price: 18000,
    description: 'قات صعدي مقرمش، يتم حصاده يومياً من مزارع صعدة. خيار شائع لنكهته ورائحته القوية.',
    vendor: 'تعاونية مزارعي اليمن',
    images: ['https://placehold.co/600x600'],
    rating: 4.9,
    reviews: 250,
    dataAiHint: 'khat leaves',
    governorateId: 'sanaa',
    marketId: 'shamlan',
    khatTypes: [
        { id: '3-1', name: 'الصعدي', price: 18000, description: 'أوراق طازجة ومقرمشة من صعدة.' },
    ],
  },
  {
    id: '4',
    name: 'تبغ بنكهة (معسل)',
    category: 'ملحقات',
    price: 2000,
    description: 'مجموعة متنوعة من التبغ الفاخر بنكهات التفاح والنعناع والعنب. مغسول ثلاث مرات لدخان نقي ولذيذ.',
    vendor: 'واردات عدن',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.7,
    reviews: 95,
    dataAiHint: 'flavored tobacco',
    governorateId: 'aden',
    marketId: 'crater',
  },
  {
    id: '5',
    name: 'قات عنسي فاخر',
    category: 'قات',
    price: 20000,
    description: 'نوع نادر ومطلوب من القات العنسي، يقدم تجربة فريدة وقوية. توفر محدود.',
    vendor: 'مزارع السعيد',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.9,
    reviews: 75,
    dataAiHint: 'dark green leaves',
    governorateId: 'sanaa',
    marketId: 'bab-al-yemen',
    khatTypes: [
      { id: '5-1', name: 'العنسي', price: 20000, description: 'أفضل أنواع القات العنسي.' },
    ],
  },
  {
    id: '6',
    name: 'قارورة ماء محمولة',
    category: 'ملحقات',
    price: 3000,
    description: 'قارورة ماء متينة ومعزولة للحفاظ على برودة الماء لساعات. ضرورية لأي جلسة قات. خالية من BPA.',
    vendor: 'الحياة العصرية',
    images: ['https://placehold.co/600x600'],
    rating: 4.4,
    reviews: 150,
    dataAiHint: 'water bottle',
    governorateId: 'aden',
    marketId: 'crater',
  },
    {
    id: '7',
    name: 'قات أبيض حضرمي',
    category: 'قات',
    price: 10000,
    description: 'نوع خاص من منطقة حضرموت، معروف بلونه الفاتح وطعمه الحاد المميز. اختيار الخبراء.',
    vendor: 'تجار حضرموت',
    images: ['https://placehold.co/600x600'],
    rating: 4.6,
    reviews: 98,
    dataAiHint: 'white leaves',
    governorateId: 'hadhramaut',
    marketId: 'seiyun',
    khatTypes: [
        { id: '7-1', name: 'همداني', price: 10000, description: 'تجربة حضرمية فريدة.' },
    ],
  },
  {
    id: '8',
    name: 'موقد فحم',
    category: 'ملحقات',
    price: 4000,
    description: 'موقد فحم كهربائي يجهز الفحم في دقائق. آمن وسريع وفعال. لا غنى عنه لعشاق المداعة.',
    vendor: 'حرفيين صنعاء',
    images: ['https://placehold.co/600x600'],
    rating: 4.8,
    reviews: 112,
    dataAiHint: 'charcoal burner',
    governorateId: 'sanaa',
    marketId: 'shamlan',
  },
];

export type Order = {
  id: string;
  date: string;
  status: 'تم التوصيل' | 'قيد التجهيز' | 'ملغي';
  total: number;
  items: { productId: string; quantity: number; name: string }[];
};

export const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-07-20',
    status: 'تم التوصيل',
    total: 23000,
    items: [
      { productId: '1', quantity: 1, name: 'قات أرحبي فاخر' },
      { productId: '4', quantity: 2, name: 'تبغ بنكهة (معسل)' },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-07-22',
    status: 'تم التوصيل',
    total: 8000,
    items: [
      { productId: '2', quantity: 1, name: 'مداعة تقليدية' },
    ],
  },
  {
    id: 'ORD-003',
    date: '2024-07-25',
    status: 'قيد التجهيز',
    total: 39000,
    items: [
      { productId: '3', quantity: 2, name: 'قات صعدي' },
      { productId: '6', quantity: 1, name: 'قارورة ماء محمولة' },
    ],
  },
    {
    id: 'ORD-004',
    date: '2024-07-26',
    status: 'ملغي',
    total: 20000,
    items: [
      { productId: '5', quantity: 1, name: 'قات عنسي فاخر' },
    ],
  },
];

export type ChatMessage = {
  sender: 'Customer' | 'Vendor';
  message: string;
  timestamp: string;
};

export type QuoteRequest = {
  id: string;
  date: string;
  customerName: string;
  productName: string;
  khatTypeName: string;
  quantity: number;
  status: 'جديد' | 'تم الرد' | 'مقبول' | 'ملغي';
  estimatedPrice: number;
  finalPrice?: number;
  messages: ChatMessage[];
  deliveryOption: 'توصيل' | 'استلام';
  deliveryAddress?: string;
};

export const quoteRequests: QuoteRequest[] = [
  {
    id: 'QT-001',
    date: '2024-07-28',
    customerName: 'أحمد الفلان',
    productName: 'قات أرحبي فاخر',
    khatTypeName: 'الأرحبي',
    quantity: 5,
    status: 'جديد',
    estimatedPrice: 75000,
    deliveryOption: 'توصيل',
    deliveryAddress: 'شارع حدة، صنعاء، اليمن',
    messages: [
      { sender: 'Customer', message: 'مرحبًا، هل السعر قابل للتفاوض؟', timestamp: '2024-07-28T10:00:00Z' },
    ],
  },
  {
    id: 'QT-002',
    date: '2024-07-28',
    customerName: 'فاطمة السعيد',
    productName: 'قات صعدي',
    khatTypeName: 'الصعدي',
    quantity: 10,
    status: 'جديد',
    estimatedPrice: 180000,
    deliveryOption: 'استلام',
    messages: [],
  },
  {
    id: 'QT-003',
    date: '2024-07-27',
    customerName: 'يوسف الحداد',
    productName: 'قات عنسي فاخر',
    khatTypeName: 'العنسي',
    quantity: 3,
    status: 'تم الرد',
    estimatedPrice: 60000,
    finalPrice: 58000,
    deliveryOption: 'استلام',
    messages: [
        { sender: 'Customer', message: 'كم آخر السعر لهذه الكمية؟', timestamp: '2024-07-27T14:00:00Z' },
        { sender: 'Vendor', message: 'أهلاً بك. يمكنني أن أقدم لك سعرًا نهائيًا قدره 58000 ريال.', timestamp: '2024-07-27T14:05:00Z' },
    ],
  },
   {
    id: 'QT-004',
    date: '2024-07-26',
    customerName: 'عائشة العمودي',
    productName: 'قات أرحبي فاخر',
    khatTypeName: 'الأرحبي',
    quantity: 8,
    status: 'مقبول',
    estimatedPrice: 120000,
    finalPrice: 115000,
    deliveryOption: 'توصيل',
    deliveryAddress: 'حي شميلة، صنعاء، اليمن',
    messages: [
        { sender: 'Vendor', message: 'تم تحديد السعر النهائي بـ 115000 ريال. في انتظار تأكيدك.', timestamp: '2024-07-26T09:30:00Z' },
        { sender: 'Customer', message: 'ممتاز، موافقة. متى يمكنني توقع التوصيل؟', timestamp: '2024-07-26T09:35:00Z' },
    ],
  },
   {
    id: 'QT-005',
    date: '2024-07-25',
    customerName: 'خالد البكري',
    productName: 'قات أبيض حضرمي',
    khatTypeName: 'همداني',
    quantity: 4,
    status: 'ملغي',
    estimatedPrice: 40000,
    deliveryOption: 'استلام',
    messages: [],
  },
];


export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: 'faq1',
    question: 'كم من الوقت يستغرق التوصيل؟',
    answer: 'تختلف أوقات التوصيل حسب موقعك. في المدن الرئيسية، نهدف إلى التوصيل في نفس اليوم للطلبات التي يتم تقديمها قبل الظهر. بالنسبة للمناطق الأخرى، قد يستغرق الأمر من يوم إلى يومي عمل.',
  },
  {
    id: 'faq2',
    question: 'هل عملية الدفع آمنة؟',
    answer: 'نعم، بكل تأكيد. نستخدم تشفيرًا قياسيًا في الصناعة ونتعاون مع مزودي خدمات الأموال عبر الهاتف المحمول الموثوق بهم لضمان أمان معاملاتك.',
  },
  {
    id: 'faq3',
    question: 'كيف يمكنني التأكد من جودة القات؟',
    answer: 'نحن نتعاون مباشرة مع المزارع والبائعين ذوي السمعة الطيبة المعروفين بمنتجاتهم عالية الجودة. لكل بائع ملف شخصي يحتوي على تقييمات ومراجعات المستخدمين لمساعدتك في اتخاذ قرار مستنير.',
  },
  {
    id: 'faq4',
    question: 'ما هي سياسة الإرجاع الخاصة بكم؟',
    answer: 'نظرًا لطبيعة القات القابلة للتلف، فإننا لا نقبل المرتجعات. ومع ذلك، إذا لم تكن راضيًا عن طلبك، يرجى الاتصال بدعم العملاء في غضون 3 ساعات من التسليم، وسنبذل قصارى جهدنا لحل المشكلة.',
  },
  {
    id: 'faq5',
    question: 'كيف أصبح بائعًا على المنصة؟',
    answer: 'نحن نتطلع دائمًا إلى الشراكة مع البائعين المتميزين. يرجى الانتقال إلى قسم "اتصل بنا" وإرسال رسالة إلينا بعنوان "استفسار بائع". سيعود فريقنا إليك بالخطوات التالية.',
  }
];
