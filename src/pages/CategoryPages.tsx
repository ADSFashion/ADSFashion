import { ShopPage } from './ShopPage';
import { categories } from '@/data/catalog';

const cat = (id: string) => categories.find((c) => c.id === id)!;

export const ShopAllPage = () => (
  <ShopPage
    title="All Products"
    eyebrow="The Collection"
    breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Shop' }]}
  />
);

export const MenPage = () => (
  <ShopPage
    title="Men"
    eyebrow="Tailored Modernity"
    bannerImage={cat('men').image}
    category="men"
    breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Men' }]}
  />
);

export const WomenPage = () => (
  <ShopPage
    title="Women"
    eyebrow="Effortless Elegance"
    bannerImage={cat('women').image}
    category="women"
    breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Women' }]}
  />
);

export const KidsPage = () => (
  <ShopPage
    title="Kids"
    eyebrow="Heritage, Mini"
    bannerImage={cat('kids').image}
    category="kids"
    breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Kids' }]}
  />
);

export const NewArrivalsPage = () => (
  <ShopPage
    title="New Arrivals"
    eyebrow="Just Landed"
    bannerImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80"
    filter={(p) => !!p.isNew}
    breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'New Arrivals' }]}
  />
);

export const SalePage = () => (
  <ShopPage
    title="Sale"
    eyebrow="Final Markdowns"
    bannerImage="https://images.unsplash.com/photo-1551232864-3f0890e980e9?auto=format&fit=crop&w=2000&q=80"
    filter={(p) => p.isOnSale || !!p.compareAt}
    breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Sale' }]}
  />
);
