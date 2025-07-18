export type KhatType = {
  id: string;
  name: 'رؤوس' | 'قطل' | 'عادي';
  price: number;
  description: string;
};

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
  khatTypes?: KhatType[];
};

export const products: Product[] = [
  {
    id: '1',
    name: 'قات أخضر ملكي',
    category: 'قات',
    price: 25,
    description: 'تشكيلة فاخرة من أوراق القات الطازجة، تتميز بلونها الأخضر الزاهي وتأثيرها القوي. مصدرها مرتفعات اليمن.',
    vendor: 'مزارع السعيد',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.8,
    reviews: 120,
    dataAiHint: 'green leaves',
    khatTypes: [
      { id: '1-1', name: 'رؤوس', price: 30, description: 'البراعم العلوية الطرية، ذات قيمة عالية.' },
      { id: '1-2', name: 'قطل', price: 25, description: 'أوراق من المستوى المتوسط، خيار متوازن.' },
      { id: '1-3', name: 'عادي', price: 20, description: 'حزمة عادية للاستخدام اليومي.' },
    ],
  },
  {
    id: '2',
    name: 'مداعة تقليدية',
    category: 'ملحقات',
    price: 45,
    description: 'مداعة تقليدية مصنوعة بحرفية من الخشب المحلي وتتميز بنقوش معقدة. مثالية لتجربة سلسة.',
    vendor: 'حرفيين صنعاء',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.6,
    reviews: 85,
    dataAiHint: 'hookah pipe',
  },
  {
    id: '3',
    name: 'قات جبلي منعش',
    category: 'قات',
    price: 20,
    description: 'قات منعش ومقرمش، يتم حصاده يومياً من سفوح الجبال المدرجة. خيار شائع لنكهته ورائحته المتوازنة.',
    vendor: 'تعاونية مزارعي اليمن',
    images: ['https://placehold.co/600x600'],
    rating: 4.5,
    reviews: 210,
    dataAiHint: 'khat leaves',
    khatTypes: [
        { id: '3-1', name: 'رؤوس', price: 25, description: 'براعم علوية مقرمشة من الجبال.' },
        { id: '3-2', name: 'عادي', price: 20, description: 'قات جبلي منعش بقيمة رائعة.' },
    ],
  },
  {
    id: '4',
    name: 'تبغ بنكهة (معسل)',
    category: 'ملحقات',
    price: 10,
    description: 'مجموعة متنوعة من التبغ الفاخر بنكهات التفاح والنعناع والعنب. مغسول ثلاث مرات لدخان نقي ولذيذ.',
    vendor: 'واردات عدن',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.7,
    reviews: 95,
    dataAiHint: 'flavored tobacco',
  },
  {
    id: '5',
    name: 'قات الورقة الذهبية',
    category: 'قات',
    price: 30,
    description: 'نوع نادر ومطلوب من القات بأوراق ذهبية اللون، يقدم تجربة فريدة ومعتدلة. توفر محدود.',
    vendor: 'مزارع السعيد',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.9,
    reviews: 75,
    dataAiHint: 'yellow leaves',
    khatTypes: [
      { id: '5-1', name: 'رؤوس', price: 35, description: 'براعم علوية ذهبية حصرية.' },
      { id: '5-2', name: 'قطل', price: 30, description: 'أوراق ذهبية ناعمة ومعتدلة.' },
    ],
  },
  {
    id: '6',
    name: 'قارورة ماء محمولة',
    category: 'ملحقات',
    price: 15,
    description: 'قارورة ماء متينة ومعزولة للحفاظ على برودة الماء لساعات. ضرورية لأي جلسة قات. خالية من BPA.',
    vendor: 'الحياة العصرية',
    images: ['https://placehold.co/600x600'],
    rating: 4.4,
    reviews: 150,
    dataAiHint: 'water bottle',
  },
    {
    id: '7',
    name: 'قات أبيض حضرمي',
    category: 'قات',
    price: 22,
    description: 'نوع خاص من منطقة حضرموت، معروف بلونه الفاتح وطعمه الحاد المميز. اختيار الخبراء.',
    vendor: 'تجار حضرموت',
    images: ['https://placehold.co/600x600'],
    rating: 4.6,
    reviews: 98,
    dataAiHint: 'white leaves',
    khatTypes: [
        { id: '7-1', name: 'رؤوس', price: 28, description: 'براعم علوية ذات طعم حاد من حضرموت.' },
        { id: '7-2', name: 'عادي', price: 22, description: 'التجربة الحضرمية الكلاسيكية.' },
    ],
  },
  {
    id: '8',
    name: 'موقد فحم',
    category: 'ملحقات',
    price: 18,
    description: 'موقد فحم كهربائي يجهز الفحم في دقائق. آمن وسريع وفعال. لا غنى عنه لعشاق المداعة.',
    vendor: 'حرفيين صنعاء',
    images: ['https://placehold.co/600x600'],
    rating: 4.8,
    reviews: 112,
    dataAiHint: 'charcoal burner',
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
    total: 45,
    items: [
      { productId: '1', quantity: 1, name: 'قات أخضر ملكي' },
      { productId: '4', quantity: 2, name: 'تبغ بنكهة (معسل)' },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-07-22',
    status: 'تم التوصيل',
    total: 45,
    items: [
      { productId: '2', quantity: 1, name: 'مداعة تقليدية' },
    ],
  },
  {
    id: 'ORD-003',
    date: '2024-07-25',
    status: 'قيد التجهيز',
    total: 52,
    items: [
      { productId: '3', quantity: 2, name: 'قات جبلي منعش' },
      { productId: '6', quantity: 1, name: 'قارورة ماء محمولة' },
    ],
  },
    {
    id: 'ORD-004',
    date: '2024-07-26',
    status: 'ملغي',
    total: 30,
    items: [
      { productId: '5', quantity: 1, name: 'قات الورقة الذهبية' },
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
    productName: 'قات أخضر ملكي',
    khatTypeName: 'رؤوس',
    quantity: 5,
    status: 'جديد',
    estimatedPrice: 150,
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
    productName: 'قات جبلي منعش',
    khatTypeName: 'عادي',
    quantity: 10,
    status: 'جديد',
    estimatedPrice: 200,
    deliveryOption: 'استلام',
    messages: [],
  },
  {
    id: 'QT-003',
    date: '2024-07-27',
    customerName: 'يوسف الحداد',
    productName: 'قات الورقة الذهبية',
    khatTypeName: 'قطل',
    quantity: 3,
    status: 'تم الرد',
    estimatedPrice: 90,
    finalPrice: 85,
    deliveryOption: 'استلام',
    messages: [
        { sender: 'Customer', message: 'كم آخر السعر لهذه الكمية؟', timestamp: '2024-07-27T14:00:00Z' },
        { sender: 'Vendor', message: 'أهلاً بك. يمكنني أن أقدم لك سعرًا نهائيًا قدره 85 دولارًا.', timestamp: '2024-07-27T14:05:00Z' },
    ],
  },
   {
    id: 'QT-004',
    date: '2024-07-26',
    customerName: 'عائشة العمودي',
    productName: 'قات أخضر ملكي',
    khatTypeName: 'قطل',
    quantity: 8,
    status: 'مقبول',
    estimatedPrice: 200,
    finalPrice: 190,
    deliveryOption: 'توصيل',
    deliveryAddress: 'حي شميلة، صنعاء، اليمن',
    messages: [
        { sender: 'Vendor', message: 'تم تحديد السعر النهائي بـ 190 دولارًا. في انتظار تأكيدك.', timestamp: '2024-07-26T09:30:00Z' },
        { sender: 'Customer', message: 'ممتاز، موافقة. متى يمكنني توقع التوصيل؟', timestamp: '2024-07-26T09:35:00Z' },
    ],
  },
   {
    id: 'QT-005',
    date: '2024-07-25',
    customerName: 'خالد البكري',
    productName: 'قات أبيض حضرمي',
    khatTypeName: 'رؤوس',
    quantity: 4,
    status: 'ملغي',
    estimatedPrice: 112,
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
