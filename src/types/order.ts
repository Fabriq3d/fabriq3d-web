export interface Order {
  _id: string;
  name: string;
  email: string;
  design: {
    text: string;
    color: string;
    model: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}
