-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  sizes TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  status TEXT DEFAULT 'pending',
  total_amount NUMERIC NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_proof_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  size TEXT,
  price_at_purchase NUMERIC NOT NULL
);

-- Note: In InsForge, auth.users is special. We use UUID for user_id and link it via RLS.

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public read on products" ON public.products;
    CREATE POLICY "Allow public read on products" ON public.products FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
    CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
    CREATE POLICY "Users can create their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;
    CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid())
    );

    DROP POLICY IF EXISTS "Users can create their own order items" ON public.order_items;
    CREATE POLICY "Users can create their own order items" ON public.order_items FOR INSERT WITH CHECK (
      EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid())
    );
END $$;
