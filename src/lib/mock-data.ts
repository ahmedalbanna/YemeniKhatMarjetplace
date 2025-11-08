export type KhatType = {
  id: string;
  name: 'بزغة' | 'رؤوس' | 'أميال' | 'عاقدات' | 'أبو ريشة صفراء';
  pricePerGram: number; // Changed from price
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
  strain: 'أرحبي' | 'صعدي' | 'عنسي' | 'همداني' | 'حضرمي';
  category: 'قات';
  price: number; // Base price for general display, can be considered price for a base unit like a "maddah"
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
    strain: 'أرحبي',
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
      { id: '1-1', name: 'رؤوس', pricePerGram: 180, description: 'أفضل الرؤوس المختارة بعناية.' },
      { id: '1-2', name: 'عاقدات', pricePerGram: 150, description: 'عاقدات طرية ذات جودة عالية.' },
      { id: '1-3', name: 'أميال', pricePerGram: 120, description: 'أميال ممتازة للمستخدم اليومي.' },
    ],
  },
  {
    id: '3',
    name: 'قات صعدي',
    strain: 'صعدي',
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
        { id: '3-1', name: 'بزغة', pricePerGram: 220, description: 'بزغة صعدي نادرة وقوية المفعول.' },
        { id: '3-2', name: 'رؤوس', pricePerGram: 180, description: 'رؤوس صعدي طازجة ومقرمشة.' },
    ],
  },
  {
    id: '5',
    name: 'قات عنسي فاخر',
    strain: 'عنسي',
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
      { id: '5-1', name: 'رؤوس', pricePerGram: 250, description: 'أفضل أنواع القات العنسي الفاخر.' },
      { id: '5-2', name: 'أبو ريشة صفراء', pricePerGram: 200, description: 'يتميز بلونه الأصفر وطعمه الفريد.' },
    ],
  },
  {
    id: '7',
    name: 'قات أبيض حضرمي',
    strain: 'حضرمي',
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
        { id: '7-1', name: 'رؤوس', pricePerGram: 120, description: 'تجربة حضرمية فريدة.' },
        { id: '7-2', name: 'أميال', pricePerGram: 100, description: 'جيد للاستخدام اليومي.' },
    ],
  },
];

export type Order = {
  id: string;
  quoteId: string;
  date: string;
  status: 'تم التوصيل' | 'قيد التجهيز' | 'بانتظار الموافقة' | 'ملغي';
  total: number;
};

export const orders: Order[] = [
  {
    id: 'ORD-001',
    quoteId: 'QT-004',
    date: '2024-07-26',
    status: 'تم التوصيل',
    total: 29000,
  },
  {
    id: 'ORD-002',
    quoteId: 'QT-003',
    date: '2024-07-27',
    status: 'قيد التجهيز',
    total: 19500,
  },
    {
    id: 'ORD-003',
    quoteId: 'QT-001',
    date: '2024-07-28',
    status: 'بانتظار الموافقة',
    total: 18000,
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
  status: 'بانتظار موافقة البائع' | 'قيد التفاوض' | 'تم الرد' | 'مقبول' | 'ملغي';
  estimatedPrice: number;
  finalPrice?: number;
  messages: ChatMessage[];
  deliveryOption: 'Delivery' | 'Pickup';
  deliveryAddress?: string;
};

export const quoteRequests: QuoteRequest[] = [
  {
    id: 'QT-001',
    date: '2024-07-28',
    customerName: 'أحمد الفلان',
    productName: 'قات أرحبي فاخر',
    khatTypeName: 'رؤوس',
    quantity: 100, // in grams
    status: 'بانتظار موافقة البائع',
    estimatedPrice: 18000, // 100g * 180
    deliveryOption: 'Delivery',
    deliveryAddress: 'شارع حدة، صنعاء، اليمن',
    messages: [
      { sender: 'Customer', message: 'مرحبًا، هذا طلبي المبدئي، هل السعر قابل للتفاوض لكمية أكبر؟', timestamp: '2024-07-28T10:00:00Z' },
    ],
  },
  {
    id: 'QT-002',
    date: '2024-07-28',
    customerName: 'فاطمة السعيد',
    productName: 'قات صعدي',
    khatTypeName: 'بزغة',
    quantity: 50,
    status: 'بانتظار موافقة البائع',
    estimatedPrice: 11000, // 50g * 220
    deliveryOption: 'Pickup',
    messages: [],
  },
  {
    id: 'QT-003',
    date: '2024-07-27',
    customerName: 'يوسف الحداد',
    productName: 'قات عنسي فاخر',
    khatTypeName: 'رؤوس',
    quantity: 80,
    status: 'قيد التفاوض',
    estimatedPrice: 20000, // 80g * 250
    finalPrice: 19500,
    deliveryOption: 'Pickup',
    messages: [
        { sender: 'Customer', message: 'كم آخر السعر لهذه الكمية؟', timestamp: '2024-07-27T14:00:00Z' },
        { sender: 'Vendor', message: 'أهلاً بك. يمكنني أن أقدم لك سعرًا نهائيًا قدره 19500 ريال.', timestamp: '2024-07-27T14:05:00Z' },
    ],
  },
   {
    id: 'QT-004',
    date: '2024-07-26',
    customerName: 'عائشة العمودي',
    productName: 'قات أرحبي فاخر',
    khatTypeName: 'عاقدات',
    quantity: 200,
    status: 'مقبول',
    estimatedPrice: 30000, // 200g * 150
    finalPrice: 29000,
    deliveryOption: 'Delivery',
    deliveryAddress: 'حي شميلة، صنعاء، اليمن',
    messages: [
        { sender: 'Vendor', message: 'تم تحديد السعر النهائي بـ 29000 ريال. في انتظار تأكيدك.', timestamp: '2024-07-26T09:30:00Z' },
        { sender: 'Customer', message: 'ممتاز، موافقة. متى يمكنني توقع التوصيل؟', timestamp: '2024-07-26T09:35:00Z' },
    ],
  },
   {
    id: 'QT-005',
    date: '2024-07-25',
    customerName: 'خالد البكري',
    productName: 'قات أبيض حضرمي',
    khatTypeName: 'أميال',
    quantity: 150,
    status: 'ملغي',
    estimatedPrice: 15000, // 150g * 100
    deliveryOption: 'Pickup',
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

export type Wallet = {
  balance: number;
};

export type Transaction = {
  id: string;
  date: string;
  type: 'deposit' | 'payment' | 'refund';
  amount: number;
  description: string;
};

export const wallet: Wallet = {
  balance: 52500,
};

export const transactions: Transaction[] = [
    {
        id: 'TXN-001',
        date: '2024-07-26',
        type: 'payment',
        amount: 29000,
        description: 'دفع للطلب ORD-001'
    },
    {
        id: 'TXN-002',
        date: '2024-07-25',
        type: 'deposit',
        amount: 100000,
        description: 'إيداع من حساب بنكي'
    },
     {
        id: 'TXN-003',
        date: '2024-07-24',
        type: 'refund',
        amount: 15000,
        description: 'استرداد للطلب الملغي QT-005'
    },
     {
        id: 'TXN-004',
        date: '2024-07-22',
        type: 'payment',
        amount: 18500,
        description: 'دفع للطلب X-485'
    },
];
