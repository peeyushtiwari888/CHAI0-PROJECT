import { Search, ShoppingBag, Menu } from "lucide-react";

export function EcommercePreview() {
  return (
    <div className="flex h-full w-full flex-col bg-white text-neutral-900 font-sans">
      {/* Announcement Bar */}
      <div className="bg-neutral-900 text-white text-[10px] uppercase tracking-widest text-center py-2 flex items-center justify-center font-medium">
        Free worldwide shipping on orders over $150
      </div>

      {/* Navigation */}
      <header className="flex h-16 items-center justify-between px-6 lg:px-12 border-b border-neutral-100 shrink-0">
        <div className="flex items-center gap-6">
          <Menu className="size-5 lg:hidden" />
          <div className="text-xl font-bold tracking-tighter">MONO.</div>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium ml-8">
            <span className="text-neutral-900 border-b-2 border-neutral-900 pb-1">Shop All</span>
            <span className="text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">Collections</span>
            <span className="text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">About</span>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-neutral-600">
          <Search className="size-5 hover:text-neutral-900 transition-colors cursor-pointer" />
          <div className="relative">
            <ShoppingBag className="size-5 hover:text-neutral-900 transition-colors cursor-pointer" />
            <div className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-neutral-900 text-white text-[9px] font-bold flex items-center justify-center">
              2
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Minimal Hero */}
        <div className="relative h-48 sm:h-64 bg-neutral-100 flex items-center px-6 lg:px-12">
          <div className="max-w-md">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Essential Collection</h1>
            <p className="text-sm text-neutral-600 mb-6">Elevate your daily routine with our meticulously crafted essentials. Designed for longevity and minimal aesthetic.</p>
            <button className="bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 hover:bg-neutral-800 transition-colors">
              Explore Now
            </button>
          </div>
        </div>

        {/* Filters & Grid */}
        <div className="p-6 lg:px-12">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-medium">12 Products</div>
            <div className="flex gap-4 text-xs font-medium text-neutral-500">
              <span className="text-neutral-900">Sort by: Featured</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { title: "Everyday Backpack", price: "$120", category: "Bags", tag: "Best Seller" },
              { title: "Ceramic Mug Set", price: "$45", category: "Home" },
              { title: "Minimal Watch", price: "$180", category: "Accessories", tag: "New" },
              { title: "Leather Wallet", price: "$65", category: "Accessories" },
            ].map((product, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[4/5] w-full bg-neutral-100 mb-4 overflow-hidden rounded-sm">
                  {/* Mock Image Placeholder */}
                  <div className="absolute inset-0 bg-neutral-200 transition-transform duration-500 group-hover:scale-105" />
                  {product.tag && (
                    <div className="absolute top-2 left-2 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider">
                      {product.tag}
                    </div>
                  )}
                  {/* Quick Add overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-neutral-900/90 text-white text-xs text-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm">
                    Quick Add
                  </div>
                </div>
                <div className="text-xs text-neutral-500 mb-1">{product.category}</div>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium group-hover:underline underline-offset-4">{product.title}</div>
                  <div className="text-sm">{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
