export type KhatType = {
  id: string;
  name: 'Ro\'os' | 'Qatol' | 'Standard';
  price: number;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  category: 'Khat' | 'Accessories';
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
    name: 'Royal Green Khat',
    category: 'Khat',
    price: 25,
    description: 'A premium selection of the freshest khat leaves, known for their vibrant green color and potent effects. Sourced from the highlands of Yemen.',
    vendor: 'Al-Saeed Farms',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.8,
    reviews: 120,
    dataAiHint: 'green leaves',
    khatTypes: [
      { id: '1-1', name: 'Ro\'os', price: 30, description: 'The tender top shoots, highly prized.' },
      { id: '1-2', name: 'Qatol', price: 25, description: 'Mid-level leaves, a balanced choice.' },
      { id: '1-3', name: 'Standard', price: 20, description: 'Standard bundle for daily use.' },
    ],
  },
  {
    id: '2',
    name: 'Traditional Hookah Pipe',
    category: 'Accessories',
    price: 45,
    description: 'A beautifully crafted traditional hookah pipe (mada\'a), made from local wood and featuring intricate carvings. Perfect for a smooth experience.',
    vendor: 'Sana\'a Crafts',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.6,
    reviews: 85,
    dataAiHint: 'hookah pipe',
  },
  {
    id: '3',
    name: 'Mountain Fresh Khat',
    category: 'Khat',
    price: 20,
    description: 'Crisp and refreshing khat, harvested daily from the terraced mountainsides. A popular choice for its balanced flavor and aroma.',
    vendor: 'Yemen Growers Co-op',
    images: ['https://placehold.co/600x600'],
    rating: 4.5,
    reviews: 210,
    dataAiHint: 'khat leaves',
    khatTypes: [
        { id: '3-1', name: 'Ro\'os', price: 25, description: 'Crisp top shoots from the mountains.' },
        { id: '3-2', name: 'Standard', price: 20, description: 'Great value mountain-fresh khat.' },
    ],
  },
  {
    id: '4',
    name: 'Flavored Tobacco (Moassel)',
    category: 'Accessories',
    price: 10,
    description: 'A variety pack of premium flavored tobacco, including apple, mint, and grape. Triple-washed for a clean and flavorful smoke.',
    vendor: 'Aden Imports',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.7,
    reviews: 95,
    dataAiHint: 'flavored tobacco',
  },
  {
    id: '5',
    name: 'Golden Leaf Khat',
    category: 'Khat',
    price: 30,
    description: 'A rare and sought-after variety of khat with golden-hued leaves, offering a unique and mellow experience. Limited availability.',
    vendor: 'Al-Saeed Farms',
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    rating: 4.9,
    reviews: 75,
    dataAiHint: 'yellow leaves',
    khatTypes: [
      { id: '5-1', name: 'Ro\'os', price: 35, description: 'Exclusive golden top shoots.' },
      { id: '5-2', name: 'Qatol', price: 30, description: 'Smooth and mellow golden leaves.' },
    ],
  },
  {
    id: '6',
    name: 'Portable Water Flask',
    category: 'Accessories',
    price: 15,
    description: 'A durable and insulated water flask to keep your water cool for hours. Essential for any khat session. BPA-free.',
    vendor: 'Modern Living',
    images: ['https://placehold.co/600x600'],
    rating: 4.4,
    reviews: 150,
    dataAiHint: 'water bottle',
  },
    {
    id: '7',
    name: 'Hadrami White Khat',
    category: 'Khat',
    price: 22,
    description: 'A special variety from the Hadramaut region, known for its lighter color and distinctively sharp taste. A connoisseur\'s choice.',
    vendor: 'Hadramaut Traders',
    images: ['https://placehold.co/600x600'],
    rating: 4.6,
    reviews: 98,
    dataAiHint: 'white leaves',
    khatTypes: [
        { id: '7-1', name: 'Ro\'os', price: 28, description: 'Sharp-tasting top shoots from Hadramaut.' },
        { id: '7-2', name: 'Standard', price: 22, description: 'The classic Hadrami experience.' },
    ],
  },
  {
    id: '8',
    name: 'Charcoal Burner',
    category: 'Accessories',
    price: 18,
    description: 'An electric charcoal burner that gets your coals ready in minutes. Safe, fast, and efficient. A must-have for hookah enthusiasts.',
    vendor: 'Sana\'a Crafts',
    images: ['https://placehold.co/600x600'],
    rating: 4.8,
    reviews: 112,
    dataAiHint: 'charcoal burner',
  },
];

export type Order = {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  total: number;
  items: { productId: string; quantity: number; name: string }[];
};

export const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-07-20',
    status: 'Delivered',
    total: 45,
    items: [
      { productId: '1', quantity: 1, name: 'Royal Green Khat' },
      { productId: '4', quantity: 2, name: 'Flavored Tobacco (Moassel)' },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-07-22',
    status: 'Delivered',
    total: 45,
    items: [
      { productId: '2', quantity: 1, name: 'Traditional Hookah Pipe' },
    ],
  },
  {
    id: 'ORD-003',
    date: '2024-07-25',
    status: 'Processing',
    total: 52,
    items: [
      { productId: '3', quantity: 2, name: 'Mountain Fresh Khat' },
      { productId: '6', quantity: 1, name: 'Portable Water Flask' },
    ],
  },
    {
    id: 'ORD-004',
    date: '2024-07-26',
    status: 'Cancelled',
    total: 30,
    items: [
      { productId: '5', quantity: 1, name: 'Golden Leaf Khat' },
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
  status: 'New' | 'Responded' | 'Accepted' | 'Cancelled';
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
    customerName: 'Ahmed Al-Fulan',
    productName: 'Royal Green Khat',
    khatTypeName: 'Ro\'os',
    quantity: 5,
    status: 'New',
    estimatedPrice: 150,
    deliveryOption: 'Delivery',
    deliveryAddress: 'شارع حدة، صنعاء، اليمن',
    messages: [
      { sender: 'Customer', message: 'مرحبًا، هل السعر قابل للتفاوض؟', timestamp: '2024-07-28T10:00:00Z' },
    ],
  },
  {
    id: 'QT-002',
    date: '2024-07-28',
    customerName: 'Fatima Al-Saeed',
    productName: 'Mountain Fresh Khat',
    khatTypeName: 'Standard',
    quantity: 10,
    status: 'New',
    estimatedPrice: 200,
    deliveryOption: 'Pickup',
    messages: [],
  },
  {
    id: 'QT-003',
    date: '2024-07-27',
    customerName: 'Youssef Al-Haddad',
    productName: 'Golden Leaf Khat',
    khatTypeName: 'Qatol',
    quantity: 3,
    status: 'Responded',
    estimatedPrice: 90,
    finalPrice: 85,
    deliveryOption: 'Pickup',
    messages: [
        { sender: 'Customer', message: 'كم آخر السعر لهذه الكمية؟', timestamp: '2024-07-27T14:00:00Z' },
        { sender: 'Vendor', message: 'أهلاً بك. يمكنني أن أقدم لك سعرًا نهائيًا قدره 85 دولارًا.', timestamp: '2024-07-27T14:05:00Z' },
    ],
  },
   {
    id: 'QT-004',
    date: '2024-07-26',
    customerName: 'Aisha Al-Amoudi',
    productName: 'Royal Green Khat',
    khatTypeName: 'Qatol',
    quantity: 8,
    status: 'Accepted',
    estimatedPrice: 200,
    finalPrice: 190,
    deliveryOption: 'Delivery',
    deliveryAddress: 'حي شميلة، صنعاء، اليمن',
    messages: [
        { sender: 'Vendor', message: 'تم تحديد السعر النهائي بـ 190 دولارًا. في انتظار تأكيدك.', timestamp: '2024-07-26T09:30:00Z' },
        { sender: 'Customer', message: 'ممتاز، موافقة. متى يمكنني توقع التوصيل؟', timestamp: '2024-07-26T09:35:00Z' },
    ],
  },
   {
    id: 'QT-005',
    date: '2024-07-25',
    customerName: 'Khalid Al-Bakri',
    productName: 'Hadrami White Khat',
    khatTypeName: 'Ro\'os',
    quantity: 4,
    status: 'Cancelled',
    estimatedPrice: 112,
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
    question: 'How long does delivery take?',
    answer: 'Delivery times vary based on your location. In major cities, we aim for same-day delivery for orders placed before noon. For other areas, it may take 1-2 business days.',
  },
  {
    id: 'faq2',
    question: 'Is the payment process secure?',
    answer: 'Yes, absolutely. We use industry-standard encryption and partner with trusted local mobile money providers to ensure your transactions are safe and secure.',
  },
  {
    id: 'faq3',
    question: 'How can I be sure of the khat quality?',
    answer: 'We partner directly with reputable farms and vendors who are known for their high-quality products. Each vendor has a profile with user ratings and reviews to help you make an informed decision.',
  },
  {
    id: 'faq4',
    question: 'What is your return policy?',
    answer: 'Due to the perishable nature of khat, we do not accept returns. However, if you are unsatisfied with your order, please contact customer support within 3 hours of delivery, and we will do our best to resolve the issue.',
  },
  {
    id: 'faq5',
    question: 'How do I become a vendor on the platform?',
    answer: 'We are always looking to partner with quality vendors. Please navigate to the "Contact Us" section and send us a message with the subject "Vendor Inquiry". Our team will get back to you with the next steps.',
  }
];
