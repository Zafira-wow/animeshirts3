import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Ruler,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Truck,
  UserRound,
  X,
  Upload,
  RotateCcw,
  Mail,
} from "lucide-react";
import {
  categories,
  currency,
  imageUrl,
  products,
  storeConfig,
  upcomingCollections,
  type Product,
} from "./data";
import { StoreProvider, useStore, type CartLine } from "./store";
import "./App.css";

const photo = (image: string, width = 900) => imageUrl(image, width);
const productForLine = (line: CartLine) =>
  products.find((item) => item.id === line.productId) ?? products[6];
const linePrice = (line: CartLine) =>
  line.customText
    ? (line.customBasePrice ?? productForLine(line).price) +
      (line.customSurcharge ?? 8)
    : productForLine(line).price;

function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link
      className={`brand-mark${small ? " brand-mark--small" : ""}`}
      to="/"
      aria-label="Zero Rules home"
    >
      <span className="brand-word">
        zero<span>rules</span>
        <i>.</i>
      </span>
      <span className="brand-tagline">your own rules</span>
    </Link>
  );
}

function Header() {
  const { cartCount, wishlist } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const links = [
    { to: "/custom-tee", label: "Custom tee", icon: Sparkles },
    { to: "/search", label: "Search", icon: Search },
    { to: "/profile", label: "Profile", icon: UserRound },
    {
      to: "/wishlist",
      label: "Wish list",
      icon: Heart,
      count: wishlist.length,
    },
    { to: "/cart", label: "Cart", icon: ShoppingBag, count: cartCount },
    { to: "/support", label: "Support", icon: CircleHelp },
  ];
  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMenuOpen(false);
  };
  return (
    <>
      <div className="topline">
        <span>GOOD FIT. NO RULEBOOK.</span>
        <span>
          COD AVAILABLE <b>·</b> LOCAL DEMO STORE
        </span>
        <span>DESIGNED TO MOVE</span>
      </div>
      <header className="site-header">
        <button
          className="icon-button mobile-menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <div className="header-logo">
          <Logo />
        </div>
        <nav
          className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map(({ to, label, icon: Icon, count }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link${isActive ? " is-active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon-wrap">
                <Icon size={16} strokeWidth={1.8} />
                {count ? <b className="nav-count">{count}</b> : null}
              </span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        {searchOpen && (
          <form className="header-search" onSubmit={submit}>
            <Search size={16} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the collection"
              aria-label="Search products"
            />
            <button
              className="icon-button"
              type="button"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
            >
              <X size={17} />
            </button>
          </form>
        )}
        <button
          className="header-search-toggle"
          aria-label="Open search"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search size={18} />
        </button>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <p className="footer-label">Need a hand?</p>
          <Link to="/support">
            Contact us <ArrowDownRight size={14} />
          </Link>
          <Link to="/track-order">
            Track an order <ArrowDownRight size={14} />
          </Link>
          <Link to="/returns">
            Returns & exchanges <ArrowDownRight size={14} />
          </Link>
          <Link to="/about">
            About Zero Rules <ArrowDownRight size={14} />
          </Link>
        </div>
        <div className="footer-brand">
          <Logo small />
          <div className="footer-brand-links">
            <Link to="/shop">Shop all</Link>
            <Link to="/new-arrivals">New arrivals</Link>
            <Link to="/custom-tee">Custom tee</Link>
            <Link to="/wishlist">Wish list</Link>
          </div>
        </div>
        <div className="footer-col">
          <p className="footer-label">The details</p>
          <Link to="/shipping">
            Shipping info <ArrowDownRight size={14} />
          </Link>
          <Link to="/size-guide">
            Size guide <ArrowDownRight size={14} />
          </Link>
          <Link to="/faq">
            FAQ <ArrowDownRight size={14} />
          </Link>
          <Link to="/privacy">
            Privacy <ArrowDownRight size={14} />
          </Link>
          <Link to="/terms">
            Terms <ArrowDownRight size={14} />
          </Link>
        </div>
      </div>
      <div className="footer-promises">
        <div>
          <Truck size={18} />
          <span>
            <b>COD AVAILABLE</b>
            <small>Demo checkout, no payment collected</small>
          </span>
        </div>
        <div>
          <RotateCcw size={18} />
          <span>
            <b>{storeConfig.returnWindowDays} DAY RETURN WINDOW*</b>
            <small>*Demo policy; terms depend on market</small>
          </span>
        </div>
        <a href={`mailto:${storeConfig.supportEmail}`}>
          <Mail size={17} /> {storeConfig.supportEmail}
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Zero Rules. Your own rules.</span>
        <span>
          Independent demo storefront · No orders are sent to a warehouse.
        </span>
      </div>
    </footer>
  );
}

function GenderSelector() {
  const { gender, setGender } = useStore();
  return (
    <div className="gender-picker">
      <span className="eyebrow">Browse by</span>
      <span className="gender-title">Gender</span>
      <div
        className="segmented"
        role="group"
        aria-label="Choose a gender collection"
      >
        {(["All", "Men", "Women", "Kids"] as const).map((item) => (
          <button
            key={item}
            className={gender === item ? "selected" : ""}
            onClick={() => setGender(item)}
            aria-pressed={gender === item}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          <i>/</i>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <b>{item.label}</b>
          )}
        </span>
      ))}
    </nav>
  );
}

function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);
  return (
    <article
      className="product-card"
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <div className="product-image-wrap">
        <Link
          to={`/product/${product.slug}`}
          className="product-image-link"
          aria-label={`View ${product.name}`}
        >
          <img
            src={photo(product.images[0])}
            alt={product.name}
            loading={index > 3 ? "lazy" : "eager"}
          />
        </Link>
        <div className="product-badges">
          {new Date(product.createdAt) > new Date("2026-09-01") && (
            <span>NEW</span>
          )}
          {product.originalPrice && <span>SALE</span>}
        </div>
        <button
          className={`wishlist-control${saved ? " is-saved" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={saved}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
        <Link to={`/product/${product.slug}`} className="quick-view">
          View piece <ArrowRight size={15} />
        </Link>
      </div>
      <div className="product-meta">
        <Link className="product-name" to={`/product/${product.slug}`}>
          {product.name}
        </Link>
        <span className="product-price">
          {product.originalPrice && (
            <del>{currency(product.originalPrice)}</del>
          )}
          {currency(product.price)}
        </span>
      </div>
      <div className="product-submeta">
        <span>{product.fit} fit</span>
        <span>
          {product.stock > 0 ? `${product.colors.length} colors` : "Sold out"}
        </span>
      </div>
    </article>
  );
}

function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length)
    return (
      <div className="empty-results">
        <span className="empty-mark">NO MATCH</span>
        <h2>Nothing on this wavelength.</h2>
        <p>Try easing up on a filter or searching a different phrase.</p>
        <Link className="button button--outline" to="/shop">
          Clear the slate <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <div className="product-grid">
      {items.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

function HomePage() {
  const featured = products.filter((item) => item.featured).slice(0, 4);
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">
            Independent streetwear / est. no rules
          </span>
          <h1>
            Wear what
            <br />
            <em>moves you.</em>
          </h1>
          <p>
            Graphic tees, everyday layers, and training gear for people who
            never needed a dress code.
          </p>
          <div className="hero-actions">
            <Link className="button button--acid" to="/shop">
              Shop all pieces <ArrowRight size={16} />
            </Link>
            <Link className="text-link" to="/custom-tee">
              Make it yours <ArrowDownRight size={16} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span>01 / 05</span>
            <span>NO UNIFORM REQUIRED</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={photo("photo-1529139574466-a303027c1d8b", 1400)}
            alt="Streetwear look from the Zero Rules collection"
          />
          <div className="hero-stamp">
            <span>ZERO</span>
            <span>RULES</span>
            <i>®</i>
          </div>
          <div className="hero-caption">
            <span>THE AUTUMN / WINTER EDIT</span>
            <ArrowDownRight size={16} />
          </div>
          <div className="hero-index">ZR—026</div>
        </div>
        <div className="hero-side-note">
          OWN YOUR
          <br />
          POINT OF VIEW
        </div>
      </section>
      <section className="browse-strip">
        <GenderSelector />
        <div className="browse-note">
          <span className="eyebrow">A little about us</span>
          <p>Considered fits. Original graphics. No borrowed identities.</p>
        </div>
        <div className="browse-index">
          01—
          <br />
          05
        </div>
      </section>
      <section className="section-block category-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Find your frequency</span>
            <h2>
              Pick a <em>lane.</em>
            </h2>
          </div>
          <Link className="text-link" to="/shop">
            All collections <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((item, index) => (
            <Link
              className="category-card"
              key={item.id}
              to={`/category/${item.id}`}
              style={{
                backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.03) 20%,rgba(0,0,0,.82) 100%),url(${photo(item.image, 700)})`,
              }}
            >
              <span className="category-index">0{index + 1}</span>
              <span className="category-copy">
                <small>{item.subtitle}</small>
                <b>{item.title}</b>
                <span className="shop-arrow">
                  Shop <ArrowDownRight size={15} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-block arrivals-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The next rotation</span>
            <h2>
              Coming into <em>focus.</em>
            </h2>
          </div>
          <Link className="text-link" to="/new-arrivals">
            See new arrivals <ArrowRight size={16} />
          </Link>
        </div>
        <div className="upcoming-grid">
          {upcomingCollections.map((item, index) => (
            <Link
              key={item.id}
              className={`upcoming-card${item.upcoming ? " upcoming-card--soon" : ""}`}
              to={item.route}
            >
              <div className="upcoming-image">
                <img src={photo(item.image, 700)} alt="" loading="lazy" />
                <span className="upcoming-number">0{index + 1}</span>
                {item.upcoming && (
                  <span className="soon-tag">IN THE WORKS</span>
                )}
              </div>
              <div className="upcoming-meta">
                <div>
                  <small>{item.subtitle}</small>
                  <b>{item.title}</b>
                </div>
                <span className="round-arrow">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="featured-band">
        <div className="featured-copy">
          <span className="eyebrow">The pieces people keep</span>
          <h2>
            Good from
            <br />
            <em>first wear.</em>
          </h2>
          <p>Designed to hold up, show up, and feel like yours from day one.</p>
          <Link className="button button--outline" to="/shop">
            Explore the shop <ArrowRight size={16} />
          </Link>
        </div>
        <div className="featured-products">
          <ProductGrid items={featured} />
        </div>
      </section>
      <section className="custom-banner">
        <div className="custom-banner-mark">
          ZR
          <br />
          <span>LAB</span>
        </div>
        <div>
          <span className="eyebrow">Your idea, your tee</span>
          <h2>
            Make room for <em>your rules.</em>
          </h2>
          <p>
            Choose your fit, pick your color, add a line or an image. Preview it
            right here.
          </p>
        </div>
        <Link className="button button--acid" to="/custom-tee">
          Enter the tee lab <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}

function ProductListing({
  categoryId,
  title,
  newOnly = false,
}: {
  categoryId?: string;
  title?: string;
  newOnly?: boolean;
}) {
  const { gender, setGender } = useStore();
  const [params] = useSearchParams();
  const query = params.get("q")?.trim().toLowerCase() ?? "";
  const [categoryFilter, setCategoryFilter] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [fit, setFit] = useState("");
  const [material, setMaterial] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [available, setAvailable] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [minPrice, maxPrice] = priceRange
    ? priceRange.split("-").map(Number)
    : [0, Number.POSITIVE_INFINITY];
  const filtered = useMemo(() => {
    let result = products.filter(
      (product) =>
        (!categoryId || product.categories.includes(categoryId)) &&
        (!categoryFilter || product.categories.includes(categoryFilter)) &&
        product.price >= minPrice &&
        product.price < maxPrice &&
        (gender === "All" || product.genders.includes(gender)) &&
        (!query ||
          [
            product.name,
            product.description,
            product.material,
            ...product.categories,
            ...product.tags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query)) &&
        (!newOnly || new Date(product.createdAt) > new Date("2026-09-01")) &&
        (!size || product.sizes.includes(size)) &&
        (!color || product.colors.some((item) => item.name === color)) &&
        (!fit || product.fit === fit) &&
        (!material ||
          product.material.toLowerCase().includes(material.toLowerCase())) &&
        (!available || product.stock > 0),
    );
    if (sort === "newest")
      result = [...result].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    if (sort === "price-low")
      result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high")
      result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name")
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [
    categoryId,
    categoryFilter,
    minPrice,
    maxPrice,
    gender,
    query,
    newOnly,
    size,
    color,
    fit,
    material,
    available,
    sort,
  ]);
  const category = categories.find((item) => item.id === categoryId);
  const active = Boolean(
    categoryFilter ||
      size ||
      color ||
      fit ||
      material ||
      priceRange ||
      available ||
      gender !== "All",
  );
  const clear = () => {
    setCategoryFilter("");
    setSize("");
    setColor("");
    setFit("");
    setMaterial("");
    setPriceRange("");
    setAvailable(false);
    setGender("All");
  };
  return (
    <main className="page-shell listing-page">
      <Breadcrumbs items={[{ label: title ?? category?.title ?? "Shop" }]} />
      <div className="listing-heading">
        <div>
          <span className="eyebrow">
            {query
              ? "Searching the collection"
              : newOnly
                ? "Fresh off the rack"
                : "Zero Rules / all pieces"}
          </span>
          <h1>
            {query ? (
              <>
                Results for <em>“{query}”</em>
              </>
            ) : (
              (title ?? category?.title ?? "Shop all")
            )}
          </h1>
          <p>
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}{" "}
            {gender !== "All" ? `for ${gender.toLowerCase()}` : "in the mix"}
          </p>
        </div>
        <div className="sort-control">
          <label htmlFor="sort-products">Sort</label>
          <select
            id="sort-products"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
          <ChevronDown size={15} />
        </div>
      </div>
      <div className="listing-controls">
        <div className="filter-title">
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          {active && (
            <button className="clear-filters" onClick={clear}>
              Clear all
            </button>
          )}
        </div>
        {!categoryId && (
          <label>
            <span>Category</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          <span>Gender</span>
          <select
            value={gender}
            onChange={(event) =>
              setGender(event.target.value as "All" | "Men" | "Women" | "Kids")
            }
          >
            <option>All</option>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </label>
        <label>
          <span>Size</span>
          <select
            value={size}
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="">All sizes</option>
            {["XS", "S", "M", "L", "XL", "XXL"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Color</span>
          <select
            value={color}
            onChange={(event) => setColor(event.target.value)}
          >
            <option value="">All colors</option>
            {Array.from(
              new Set(
                products.flatMap((product) =>
                  product.colors.map((item) => item.name),
                ),
              ),
            ).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Fit</span>
          <select value={fit} onChange={(event) => setFit(event.target.value)}>
            <option value="">All fits</option>
            <option>Regular</option>
            <option>Oversized</option>
            <option>Relaxed</option>
          </select>
        </label>
        <label>
          <span>Material</span>
          <select
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
          >
            <option value="">All materials</option>
            <option value="cotton">Cotton</option>
            <option value="terry">French terry</option>
            <option value="polyester">Polyester</option>
          </select>
        </label>
        <label>
          <span>Price</span>
          <select
            value={priceRange}
            onChange={(event) => setPriceRange(event.target.value)}
          >
            <option value="">Any price</option>
            <option value="0-35">Under $35</option>
            <option value="35-50">$35–$49</option>
            <option value="50-75">$50–$74</option>
            <option value="75-1000">$75+</option>
          </select>
        </label>
        <label className="stock-filter">
          <input
            type="checkbox"
            checked={available}
            onChange={(event) => setAvailable(event.target.checked)}
          />
          <span>In stock</span>
        </label>
      </div>
      {query && (
        <div className="query-note">
          <Search size={15} /> Matches product names, details, categories, tags,
          and materials.
        </div>
      )}
      <ProductGrid items={filtered} />
    </main>
  );
}

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [text, setText] = useState(params.get("q") ?? "");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setParams(text ? { q: text } : {});
  };
  return (
    <main className="page-shell search-page">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <span className="eyebrow">Find your next favorite</span>
      <h1>
        Search the <em>rack.</em>
      </h1>
      <form className="big-search" onSubmit={submit}>
        <Search size={21} />
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Try ‘oversized’, ‘cotton’ or ‘training’"
          aria-label="Search Zero Rules products"
          autoFocus
        />
        {text && (
          <button
            type="button"
            className="icon-button"
            onClick={() => {
              setText("");
              setParams({});
            }}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
        <button className="button button--acid" type="submit">
          Search <ArrowRight size={16} />
        </button>
      </form>
      {params.get("q") ? (
        <ProductListing title="Search results" />
      ) : (
        <div className="suggestions">
          <span className="eyebrow">Try a direction</span>
          {["oversized", "cotton", "training", "streetwear"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setText(item);
                setParams({ q: item });
              }}
            >
              {item} <ArrowDownRight size={14} />
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [image, setImage] = useState(0);
  const [color, setColor] = useState(product?.colors[0]?.name ?? "");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  if (!product) return <NotFound />;
  const saved = wishlist.includes(product.id);
  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.categories.some((category) =>
          product.categories.includes(category),
        ),
    )
    .slice(0, 4);
  const add = () => {
    if (!size) {
      setNotice("Choose a size before adding this piece.");
      return;
    }
    if (!color) {
      setNotice("Choose a color first.");
      return;
    }
    addToCart({
      productId: product.id,
      size,
      color,
      quantity: Math.min(quantity, product.stock),
    });
    setNotice(`${product.name} added to your bag.`);
  };
  return (
    <main className="page-shell detail-page">
      <Breadcrumbs
        items={[{ label: "Shop", to: "/shop" }, { label: product.name }]}
      />
      <div className="detail-layout">
        <div className="gallery">
          <div className="gallery-main">
            <img
              src={photo(product.images[image] ?? product.images[0], 1200)}
              alt={`${product.name}, view ${image + 1}`}
            />
          </div>
          <div className="gallery-thumbs">
            {product.images.map((item, index) => (
              <button
                key={`${item}-${index}`}
                className={image === index ? "active" : ""}
                onClick={() => setImage(index)}
                aria-label={`View product image ${index + 1}`}
              >
                <img src={photo(item, 250)} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-info">
          <span className="eyebrow">
            Zero Rules / {product.kind === "tee" ? "Tees" : product.kind}
          </span>
          <h1>{product.name}</h1>
          <div className="detail-price">
            {product.originalPrice && (
              <del>{currency(product.originalPrice)}</del>
            )}
            {currency(product.price)} <span>USD</span>
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="option-block">
            <div className="option-heading">
              <b>Color</b>
              <span>{color}</span>
            </div>
            <div className="swatches">
              {product.colors.map((item) => (
                <button
                  key={item.name}
                  style={{ background: item.hex }}
                  className={color === item.name ? "active" : ""}
                  onClick={() => setColor(item.name)}
                  aria-label={`Select ${item.name}`}
                  aria-pressed={color === item.name}
                  title={item.name}
                />
              ))}
            </div>
          </div>
          <div className="option-block">
            <div className="option-heading">
              <b>Size</b>
              <Link to="/size-guide">
                <Ruler size={14} /> Size guide
              </Link>
            </div>
            <div className="size-options">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  className={size === item ? "active" : ""}
                  onClick={() => {
                    setSize(item);
                    setNotice("");
                  }}
                  aria-pressed={size === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="purchase-row">
            <QuantityControl
              quantity={quantity}
              max={Math.max(1, product.stock)}
              onChange={setQuantity}
            />
            <button
              className="button button--acid add-button"
              onClick={add}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Currently unavailable" : "Add to bag"}{" "}
              <ShoppingBag size={17} />
            </button>
            <button
              className={`detail-heart${saved ? " is-saved" : ""}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label={saved ? "Remove from wish list" : "Add to wish list"}
            >
              <Heart size={20} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
          {notice && (
            <p
              className={`inline-notice${notice.startsWith("Choose") ? " inline-notice--error" : ""}`}
              role="status"
            >
              {notice.startsWith("Choose") ? (
                <CircleHelp size={15} />
              ) : (
                <Check size={15} />
              )}
              {notice}
            </p>
          )}
          {product.stock > 0 && product.stock < 8 && (
            <p className="stock-note">Only {product.stock} left in this run.</p>
          )}
          <div className="product-facts">
            <div>
              <span>Material</span>
              <b>{product.material}</b>
            </div>
            <div>
              <span>Fit</span>
              <b>{product.fit}</b>
            </div>
            <div>
              <span>Care</span>
              <b>Wash cold inside out. Hang dry.</b>
            </div>
          </div>
          <div className="detail-policy">
            <p>
              <Truck size={16} /> COD demo checkout available
            </p>
            <p>
              <RotateCcw size={16} /> Return window and conditions vary by
              market
            </p>
          </div>
        </div>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Keep looking</span>
            <h2>
              Related <em>pieces.</em>
            </h2>
          </div>
          <Link className="text-link" to="/shop">
            Shop all <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid items={related} />
      </section>
    </main>
  );
}

function QuantityControl({
  quantity,
  onChange,
  max = 20,
}: {
  quantity: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  return (
    <div className="quantity-control">
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
      >
        <Minus size={13} />
      </button>
      <span>{quantity}</span>
      <button
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}

function CartPage() {
  const { cart, removeFromCart, setQuantity } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");
  const subtotal = cart.reduce(
    (total, item) => total + linePrice(item) * item.quantity,
    0,
  );
  const discount = applied ? subtotal * 0.1 : 0;
  const shipping = cart.length ? storeConfig.shippingEstimate : 0;
  const apply = () => {
    const valid = coupon.trim().toUpperCase() === "ZERO10";
    setApplied(valid);
    setMessage(
      valid
        ? "Demo code applied: 10% off."
        : "That code is not in the local demo list.",
    );
  };
  return (
    <main className="page-shell cart-page">
      <Breadcrumbs items={[{ label: "Your bag" }]} />
      <div className="listing-heading">
        <div>
          <span className="eyebrow">The good stuff</span>
          <h1>
            Your <em>bag.</em>
          </h1>
          <p>{cart.reduce((sum, item) => sum + item.quantity, 0)} pieces</p>
        </div>
        <Link className="text-link" to="/shop">
          <ArrowLeft size={15} /> Keep shopping
        </Link>
      </div>
      {!cart.length ? (
        <div className="empty-results cart-empty">
          <span className="empty-mark">ALL CLEAR</span>
          <h2>Your bag is taking a breather.</h2>
          <p>There’s nothing in here yet. Good things are out there.</p>
          <Link to="/shop" className="button button--acid">
            Explore the shop <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {cart.map((item) => {
              const product = productForLine(item);
              return (
                <article className="cart-line" key={item.key}>
                  <Link to={`/product/${product.slug}`} className="cart-thumb">
                    <img
                      src={photo(product.images[0], 300)}
                      alt={product.name}
                    />
                  </Link>
                  <div className="cart-line-info">
                    <Link
                      to={`/product/${product.slug}`}
                      className="cart-product-name"
                    >
                      {item.customText
                        ? `${item.customModel === "oversized" ? "Oversized Heavy Tee" : "Classic Cotton Tee"} · ${item.customText}`
                        : product.name}
                    </Link>
                    <span>
                      {item.color} / {item.size}
                    </span>
                    {item.customText && (
                      <small>
                        Custom preview only · {item.customTextColor}
                      </small>
                    )}
                    <div className="cart-line-bottom">
                      <QuantityControl
                        quantity={item.quantity}
                        max={Math.max(1, product.stock)}
                        onChange={(value) => setQuantity(item.key, value)}
                      />
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.key)}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <b className="cart-line-price">
                    {currency(linePrice(item) * item.quantity)}
                  </b>
                </article>
              );
            })}
          </div>
          <aside className="cart-summary">
            <span className="eyebrow">Order estimate</span>
            <h2>Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <b>{currency(subtotal)}</b>
            </div>
            {applied && (
              <div className="summary-row discount-row">
                <span>Demo discount</span>
                <b>−{currency(discount)}</b>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping estimate</span>
              <b>{currency(shipping)}</b>
            </div>
            <div className="coupon-row">
              <label htmlFor="coupon">Promo code</label>
              <div>
                <input
                  id="coupon"
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  placeholder="Enter code"
                />
                <button onClick={apply}>Apply</button>
              </div>
              {message && <small role="status">{message}</small>}
            </div>
            <div className="summary-row total-row">
              <span>Estimated total</span>
              <b>{currency(subtotal - discount + shipping)}</b>
            </div>
            <p className="summary-disclaimer">
              Demo estimate in USD. Final shipping depends on the configured
              market.
            </p>
            <Link
              className="button button--acid checkout-button"
              to="/checkout"
            >
              Continue to checkout <ArrowRight size={16} />
            </Link>
            <p className="payment-note">
              <PackageCheck size={15} /> Cash on delivery demo available
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [sameAddress, setSameAddress] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const subtotal = cart.reduce(
    (total, item) => total + linePrice(item) * item.quantity,
    0,
  );
  const shipping = cart.length ? storeConfig.shippingEstimate : 0;
  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart.length || submitting) return;
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const id = `ZR-${Date.now().toString().slice(-8)}`;
    const order = {
      id,
      email: form.get("email"),
      name: `${form.get("firstName")} ${form.get("lastName")}`,
      total: subtotal + shipping,
      createdAt: new Date().toISOString(),
      lines: cart,
      mode: "local demo / cash on delivery",
    };
    sessionStorage.setItem(`zero-rules-order-${id}`, JSON.stringify(order));
    clearCart();
    navigate(`/order-confirmation/${id}`);
  };
  if (!cart.length)
    return (
      <main className="page-shell">
        <Breadcrumbs items={[{ label: "Checkout" }]} />
        <div className="empty-results cart-empty">
          <h1>Your bag is empty.</h1>
          <p>Add something before heading to checkout.</p>
          <Link className="button button--acid" to="/shop">
            Shop pieces <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  return (
    <main className="page-shell checkout-page">
      <Breadcrumbs
        items={[{ label: "Your bag", to: "/cart" }, { label: "Checkout" }]}
      />
      <div className="listing-heading">
        <div>
          <span className="eyebrow">Last step, no pressure</span>
          <h1>
            Checkout <em>demo.</em>
          </h1>
          <p>Your details stay in this local browser session.</p>
        </div>
        <span className="demo-chip">LOCAL DEMO</span>
      </div>
      <form className="checkout-layout" onSubmit={placeOrder}>
        <div className="checkout-form">
          <section className="form-section">
            <div className="form-heading">
              <span>01</span>
              <div>
                <h2>Contact</h2>
                <p>Used for this local confirmation only.</p>
              </div>
            </div>
            <div className="form-grid">
              <label className="field field--wide">
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                />
              </label>
              <label className="field">
                First name
                <input name="firstName" autoComplete="given-name" required />
              </label>
              <label className="field">
                Last name
                <input name="lastName" autoComplete="family-name" required />
              </label>
              <label className="field field--wide">
                Phone
                <input name="phone" type="tel" autoComplete="tel" required />
              </label>
            </div>
          </section>
          <section className="form-section">
            <div className="form-heading">
              <span>02</span>
              <div>
                <h2>Delivery</h2>
                <p>Shipping is an estimate in this demo.</p>
              </div>
            </div>
            <div className="form-grid">
              <label className="field field--wide">
                Street address
                <input name="address" autoComplete="street-address" required />
              </label>
              <label className="field">
                City
                <input name="city" autoComplete="address-level2" required />
              </label>
              <label className="field">
                Postal code
                <input name="postal" autoComplete="postal-code" required />
              </label>
              <label className="field field--wide">
                Country
                <select name="country" defaultValue={storeConfig.countries[0].code}>
                  {storeConfig.countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="shipping-choice">
              <span>
                <Truck size={17} /> Standard demo shipping
              </span>
              <b>{currency(shipping)}</b>
            </div>
            <label className="check-line">
              <input
                type="checkbox"
                checked={sameAddress}
                onChange={(event) => setSameAddress(event.target.checked)}
              />{" "}
              Billing address same as delivery address
            </label>
            {!sameAddress && (
              <div className="form-grid billing-fields">
                <label className="field field--wide">
                  Billing address
                  <input name="billingAddress" required />
                </label>
                <label className="field">
                  City
                  <input name="billingCity" required />
                </label>
                <label className="field">
                  Postal code
                  <input name="billingPostal" required />
                </label>
              </div>
            )}
          </section>
          <section className="form-section">
            <div className="form-heading">
              <span>03</span>
              <div>
                <h2>Payment</h2>
                <p>This storefront does not process payments.</p>
              </div>
            </div>
            <label className="payment-option">
              <input type="radio" name="payment" value="cod" defaultChecked />
              <span>
                <b>Cash on delivery</b>
                <small>
                  Demo order only. No courier or warehouse is notified.
                </small>
              </span>
              <PackageCheck size={19} />
            </label>
            <div className="payment-option payment-option--disabled">
              <input type="radio" disabled />
              <span>
                <b>Online payment</b>
                <small>Not configured for this demo.</small>
              </span>
              <span className="not-available">Unavailable</span>
            </div>
          </section>
          <label className="check-line terms-check">
            <input type="checkbox" required /> I understand this creates a local
            demo order and is not a real purchase.
          </label>
          <button
            className="button button--acid place-order"
            disabled={submitting}
          >
            {submitting ? "Creating demo order…" : "Place demo COD order"}{" "}
            <ArrowRight size={16} />
          </button>
          <p className="checkout-legal">
            No card details are requested or stored. This demo creates an order
            reference in this browser only.
          </p>
        </div>
        <aside className="checkout-summary">
          <span className="eyebrow">In your bag</span>
          {cart.map((item) => {
            const product = productForLine(item);
            return (
              <div className="checkout-item" key={item.key}>
                <img src={photo(product.images[0], 200)} alt="" />
                <div>
                  <b>
                    {item.customText
                      ? `${item.customModel === "oversized" ? "Oversized Heavy Tee" : "Classic Cotton Tee"} · ${item.customText}`
                      : product.name}
                  </b>
                  <span>
                    {item.size} / {item.color} · Qty {item.quantity}
                  </span>
                </div>
                <strong>{currency(linePrice(item) * item.quantity)}</strong>
              </div>
            );
          })}
          <div className="summary-row">
            <span>Subtotal</span>
            <b>{currency(subtotal)}</b>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <b>{currency(shipping)}</b>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <b>{currency(subtotal + shipping)}</b>
          </div>
        </aside>
      </form>
    </main>
  );
}

function OrderConfirmation() {
  const { orderId } = useParams();
  const stored = orderId
    ? sessionStorage.getItem(`zero-rules-order-${orderId}`)
    : null;
  const order = stored
    ? (JSON.parse(stored) as { name: string; total: number })
    : null;
  return (
    <main className="page-shell confirmation-page">
      <div className="confirmation-mark">
        <Check size={34} />
      </div>
      <span className="eyebrow">Local demo order created</span>
      <h1>
        That’s a <em>wrap.</em>
      </h1>
      <p>
        {order
          ? `Thanks, ${order.name}. Your demo reference is ${orderId}.`
          : `Reference: ${orderId ?? "unavailable"}. This confirmation is local to this browser.`}
      </p>
      <div className="confirmation-card">
        <span>ORDER REFERENCE</span>
        <b>{orderId}</b>
        {order && (
          <>
            <span>DEMO TOTAL</span>
            <b>{currency(order.total)}</b>
            <span>STATUS</span>
            <b>Not sent to a store or delivery provider</b>
          </>
        )}
        <small>No real order was submitted and no payment was collected.</small>
      </div>
      <div className="hero-actions">
        <Link className="button button--acid" to="/shop">
          Back to the shop <ArrowRight size={16} />
        </Link>
        <Link className="text-link" to="/track-order">
          Demo order lookup <ArrowDownRight size={15} />
        </Link>
      </div>
    </main>
  );
}

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((item) => wishlist.includes(item.id));
  return (
    <main className="page-shell listing-page">
      <Breadcrumbs items={[{ label: "Wish list" }]} />
      <div className="listing-heading">
        <div>
          <span className="eyebrow">Saved for later</span>
          <h1>
            Your wish <em>list.</em>
          </h1>
          <p>
            {items.length} {items.length === 1 ? "piece" : "pieces"} saved
          </p>
        </div>
      </div>
      {items.length ? (
        <ProductGrid items={items} />
      ) : (
        <div className="empty-results">
          <Heart size={24} />
          <h2>Nothing saved. Yet.</h2>
          <p>Tap the heart on a piece and it’ll be waiting here.</p>
          <Link className="button button--outline" to="/shop">
            Find your favorites <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </main>
  );
}

function CustomTeePage() {
  const { addToCart } = useStore();
  const [model, setModel] = useState("classic");
  const [color, setColor] = useState("Washed black");
  const [hex, setHex] = useState("#252525");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [text, setText] = useState("your own rules");
  const [textColor, setTextColor] = useState("#00d653");
  const [uploadName, setUploadName] = useState("");
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const modelDetails =
    model === "oversized"
      ? { productId: "p06", basePrice: 40, label: "Oversized Heavy Tee" }
      : { productId: "p07", basePrice: 30, label: "Classic Cotton Tee" };
  const fileChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (
      !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setMessage("Choose a PNG, JPG, or WebP under 5 MB.");
      event.target.value = "";
      return;
    }
    setUploadName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
    setMessage("");
  };
  const add = () => {
    addToCart({
      productId: modelDetails.productId,
      size,
      color,
      quantity,
      customText: text || (uploadName ? "Uploaded artwork" : "Custom print"),
      customTextColor: textColor,
      customModel: model,
      customBasePrice: modelDetails.basePrice,
      customSurcharge: 8,
    });
    setMessage(
      "Custom preview added to your bag. Artwork stays in this browser and is not sent to production.",
    );
  };
  return (
    <main className="page-shell custom-page">
      <Breadcrumbs items={[{ label: "Custom tee lab" }]} />
      <div className="listing-heading">
        <div>
          <span className="eyebrow">A functional local preview</span>
          <h1>
            Build your <em>blank.</em>
          </h1>
          <p>Make a quick mock-up. No print order is sent from this demo.</p>
        </div>
        <span className="demo-chip">ZR / LAB</span>
      </div>
      <div className="custom-layout">
        <div className="custom-preview">
          <div className="tee-preview" style={{ backgroundColor: hex }}>
            <span className="tee-neck" />
            <span className="tee-art" style={{ color: textColor }}>
              {preview ? (
                <img src={preview} alt="Your uploaded design preview" />
              ) : (
                text || "YOUR DESIGN"
              )}
            </span>
            <span className="tee-preview-id">ZR—CUSTOM</span>
          </div>
          <span className="preview-caption">
            <Check size={14} /> Preview updates as you make changes
          </span>
        </div>
        <div className="custom-controls">
          <label className="field">
            Model
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
            >
              <option value="classic">Classic cotton tee · {currency(30)}</option>
              <option value="oversized">
                Oversized heavy tee · {currency(40)}
              </option>
            </select>
          </label>
          <div className="option-block">
            <div className="option-heading">
              <b>01 / Color</b>
              <span>{color}</span>
            </div>
            <div className="swatches">
              {[
                { name: "Washed black", hex: "#252525" },
                { name: "Chalk", hex: "#e8e4dc" },
                { name: "Volt", hex: "#00d653" },
                { name: "Concrete", hex: "#858782" },
              ].map((item) => (
                <button
                  key={item.name}
                  title={item.name}
                  aria-label={`Choose ${item.name}`}
                  className={color === item.name ? "active" : ""}
                  style={{ background: item.hex }}
                  onClick={() => {
                    setColor(item.name);
                    setHex(item.hex);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="option-block">
            <div className="option-heading">
              <b>02 / Size</b>
              <Link to="/size-guide">
                <Ruler size={14} /> Size guide
              </Link>
            </div>
            <div className="size-options">
              {["S", "M", "L", "XL", "XXL"].map((item) => (
                <button
                  key={item}
                  className={size === item ? "active" : ""}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <label className="field">
            03 / Your text
            <input
              maxLength={24}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Keep it short"
            />
            <small>{text.length}/24 characters</small>
          </label>
          <label className="field color-input-label">
            04 / Text color
            <input
              type="color"
              value={textColor}
              onChange={(event) => setTextColor(event.target.value)}
            />
          </label>
          <label className="upload-field">
            <Upload size={17} />
            <span>
              {uploadName || "Add an image file"}
              <small>PNG, JPG, WebP · max 5 MB · preview only</small>
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={fileChanged}
            />
          </label>
          <div className="custom-price">
            <span>
              {modelDetails.label} <b>{currency(modelDetails.basePrice)}</b>
            </span>
            <span>
              Print preview surcharge <b>{currency(8)}</b>
            </span>
            <strong>
              Total <b>{currency(modelDetails.basePrice + 8)}</b>
            </strong>
          </div>
          <div className="custom-add">
            <QuantityControl quantity={quantity} onChange={setQuantity} />
            <button className="button button--acid" onClick={add}>
              Add custom preview <ShoppingBag size={16} />
            </button>
          </div>
          {message && (
            <p
              role="status"
              className={`inline-notice${message.startsWith("Choose") ? " inline-notice--error" : ""}`}
            >
              {message}
            </p>
          )}
          <p className="custom-disclaimer">
            A local concept preview only. This design file is not uploaded to a
            printer or saved to an account.
          </p>
        </div>
      </div>
    </main>
  );
}

function UpcomingPage() {
  const { collection } = useParams();
  const item = upcomingCollections.find((entry) => entry.id === collection);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Enter a valid email address.");
      return;
    }
    const saved = JSON.parse(
      localStorage.getItem("zero-rules-interest") ?? "[]",
    ) as string[];
    localStorage.setItem(
      "zero-rules-interest",
      JSON.stringify([...new Set([...saved, email])]),
    );
    setMessage("Saved on this device for the demo. No email was sent.");
    setEmail("");
  };
  if (!collection || collection === "new-arrivals")
    return <ProductListing newOnly title="New arrivals" />;
  return (
    <main className="page-shell upcoming-page">
      <Breadcrumbs items={[{ label: item?.title ?? "Coming soon" }]} />
      <div className="upcoming-feature">
        <img
          src={photo(item?.image ?? "photo-1556821840-3a63f95609a7", 1400)}
          alt=""
        />
        <div>
          <span className="eyebrow">
            In the works / {item?.id ?? "new collection"}
          </span>
          <h1>
            Something good
            <br />
            <em>is coming.</em>
          </h1>
          <p>
            {item?.title ?? "The next collection"} is being worked on. Leave an
            email to save your interest locally; this demo will not send a
            notification.
          </p>
          <form className="notify-form" onSubmit={submit}>
            <label className="visually-hidden" htmlFor="notify-email">
              Email address
            </label>
            <input
              id="notify-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
            />
            <button className="button button--acid">
              Save interest <ArrowRight size={15} />
            </button>
          </form>
          {message && (
            <p className="inline-notice" role="status">
              {message}
            </p>
          )}
          <Link className="text-link" to="/shop">
            Browse available pieces <ArrowDownRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function ProfilePage() {
  const [tab, setTab] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setMessage(
      "Account access is not connected in this demo. No password was collected or stored.",
    );
  };
  return (
    <main className="page-shell profile-page">
      <Breadcrumbs items={[{ label: "Profile" }]} />
      <div className="account-panel">
        <span className="eyebrow">Account / local demo</span>
        <h1>
          Your corner <em>of the store.</em>
        </h1>
        <p>
          Guest checkout is always available. Secure sign-in and order history
          need a real account service, which is not connected here.
        </p>
        <div className="account-tabs">
          {[
            ["sign-in", "Sign in"],
            ["register", "Register"],
            ["recovery", "Password help"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={tab === key ? "active" : ""}
              onClick={() => {
                setTab(key);
                setMessage("");
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <form className="account-form" onSubmit={submit}>
          <label className="field">
            Email address
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <button className="button button--acid">
            {tab === "register"
              ? "Create demo account"
              : tab === "recovery"
                ? "Request password help"
                : "Continue"}{" "}
            <ArrowRight size={16} />
          </button>
        </form>
        {message && (
          <p className="inline-notice" role="status">
            {message}
          </p>
        )}
        <Link to="/track-order" className="text-link">
          Look up a local demo order <ArrowDownRight size={15} />
        </Link>
      </div>
    </main>
  );
}

function SupportPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requests = JSON.parse(
      localStorage.getItem("zero-rules-support") ?? "[]",
    ) as {
      email: FormDataEntryValue | null;
      topic: FormDataEntryValue | null;
    }[];
    localStorage.setItem(
      "zero-rules-support",
      JSON.stringify([
        ...requests,
        { email: data.get("email"), topic: data.get("topic") },
      ]),
    );
    setSent(true);
  };
  return (
    <main className="page-shell support-page">
      <Breadcrumbs items={[{ label: "Support" }]} />
      <div className="support-layout">
        <div>
          <span className="eyebrow">Need a hand?</span>
          <h1>
            We’re listening.
            <br />
            <em>In demo mode.</em>
          </h1>
          <p>
            Send a locally stored sample request. It stays in this browser and
            does not reach a support team.
          </p>
          <div className="support-links">
            <Link to="/shipping">
              <Truck size={17} /> Shipping info <ArrowRight size={15} />
            </Link>
            <Link to="/returns">
              <RotateCcw size={17} /> Returns & exchanges{" "}
              <ArrowRight size={15} />
            </Link>
            <Link to="/faq">
              <CircleHelp size={17} /> Frequently asked <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        {sent ? (
          <div className="support-success">
            <Check size={25} />
            <h2>Request saved here.</h2>
            <p>This is a local demo record, not a sent message.</p>
            <button className="text-link" onClick={() => setSent(false)}>
              Write another <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <form className="support-form" onSubmit={submit}>
            <label className="field">
              Your name
              <input name="name" required />
            </label>
            <label className="field">
              Email
              <input name="email" type="email" required />
            </label>
            <label className="field">
              Topic
              <select name="topic">
                <option>Product question</option>
                <option>Shipping question</option>
                <option>Returns question</option>
                <option>Other</option>
              </select>
            </label>
            <label className="field">
              Message
              <textarea name="message" rows={5} required minLength={8} />
            </label>
            <button className="button button--acid">
              Save demo request <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

function TrackOrderPage() {
  const { cart } = useStore();
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const lookup = (event: FormEvent) => {
    event.preventDefault();
    const found = sessionStorage.getItem(
      `zero-rules-order-${reference.trim()}`,
    );
    setMessage(
      found
        ? `Demo reference ${reference.trim()} exists in this browser. It has not been sent to a carrier.`
        : "No local demo order found for that reference.",
    );
  };
  return (
    <main className="page-shell track-page">
      <Breadcrumbs items={[{ label: "Track order" }]} />
      <div className="track-panel">
        <span className="eyebrow">Order lookup / demo</span>
        <h1>
          Where’s my <em>order?</em>
        </h1>
        <p>
          Only demo orders created in this browser can be looked up. Nothing is
          sent to a delivery service.
        </p>
        <form className="big-search" onSubmit={lookup}>
          <PackageCheck size={20} />
          <input
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            required
            placeholder="Enter a ZR- reference"
            aria-label="Demo order reference"
          />
          <button className="button button--acid">
            Look up <ArrowRight size={16} />
          </button>
        </form>
        {message && (
          <p className="inline-notice" role="status">
            {message}
          </p>
        )}
        {cart.length > 0 && (
          <p className="track-hint">
            You have items in your bag, but no order has been created yet.
          </p>
        )}
      </div>
    </main>
  );
}

const info: Record<
  string,
  {
    eyebrow: string;
    title: string;
    intro: string;
    sections: { title: string; body: string }[];
  }
> = {
  returns: {
    eyebrow: "Store policy / configurable",
    title: "Returns, with the details.",
    intro:
      "Sample policy copy for a local demo. Confirm your market, consumer rights, timelines, and exclusions before publishing.",
    sections: [
      {
        title: `${storeConfig.returnWindowDays}-day request window`,
        body: "The demo illustrates a request within seven days of delivery for unworn, unwashed items with original tags. This is not a guarantee of eligibility or a substitute for local law.",
      },
      {
        title: "Requests and refunds",
        body: "A real store would handle requests through support. This demo does not receive return requests and no payment was collected, so no refund can be issued.",
      },
    ],
  },
  shipping: {
    eyebrow: "Delivery / sample settings",
    title: "Shipping, made clear.",
    intro:
      "Shipping prices, destinations, and delivery estimates are configurable examples only. This demo does not book a carrier or dispatch parcels.",
    sections: [
      {
        title: "Estimate at checkout",
        body: "Checkout uses a flat USD 6.95 demo estimate. Replace with country, region, weight, and carrier rules before launch.",
      },
      {
        title: "Cash on delivery",
        body: "COD is a local demo option. No cash collection, order transmission, or delivery booking takes place.",
      },
    ],
  },
  about: {
    eyebrow: "A point of view",
    title: "Independent by design.",
    intro:
      "Zero Rules is a sample streetwear storefront built around original graphic directions, useful everyday cuts, and space to make a piece your own.",
    sections: [
      {
        title: "Original, not borrowed",
        body: "Product names and graphic concepts are fictional demo content. Photography is illustrative and should be replaced with accurate product imagery.",
      },
      {
        title: "Made for a real launch",
        body: "Connect sourcing, inventory, customer support, order management, taxes, shipping, and secure payment services before selling.",
      },
    ],
  },
  faq: {
    eyebrow: "The usual questions",
    title: "Good to know.",
    intro: "This sample FAQ explains what this prototype does and does not do.",
    sections: [
      {
        title: "Can I place a real order?",
        body: "No. Checkout creates a local demo reference only. Nothing reaches a warehouse, payment service, or courier.",
      },
      {
        title: "Are the products in stock?",
        body: "Stock counts are sample data used by the interface and do not represent real inventory.",
      },
      {
        title: "Can I upload a design?",
        body: "A small image can be previewed locally in the custom tee lab. It is not uploaded or transmitted.",
      },
      {
        title: "Is sign-in available?",
        body: "No account provider is connected. Guest checkout remains available.",
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy / local demo",
    title: "Your data stays here.",
    intro:
      "Cart, wishlist, gender preference, demo interest, and support records are stored in this browser. Demo order references use session storage.",
    sections: [
      {
        title: "No analytics or payment tracking",
        body: "No analytics, advertising pixels, or payment scripts are configured. Cookie consent is therefore not shown for this demo.",
      },
      {
        title: "Before production",
        body: "Publish an accurate privacy notice for the services and tracking technologies you actually use. Add consent controls when required.",
      },
    ],
  },
  terms: {
    eyebrow: "Terms / sample only",
    title: "Terms need a real review.",
    intro:
      "This page is a placeholder for product terms, sale conditions, and consumer-rights information. It is not legal advice.",
    sections: [
      {
        title: "Demo content",
        body: "Prices, descriptions, stock levels, shipping charges, delivery, and return details are illustrative only.",
      },
      {
        title: "Before launch",
        body: "Replace sample terms with market-specific legal terms and ensure they match your actual business and fulfilment setup.",
      },
    ],
  },
  "size-guide": {
    eyebrow: "Fit notes",
    title: "Find your fit.",
    intro:
      "Use this as a starting point only. Actual garment measurements should be added for every product before launch.",
    sections: [
      {
        title: "Regular fit",
        body: "Choose your usual size for a straightforward, close-but-not-tight shape.",
      },
      {
        title: "Relaxed fit",
        body: "A little more room through the body and shoulder. Stay true to size for relaxed, size up for extra drape.",
      },
      {
        title: "Oversized fit",
        body: "Dropped shoulders and a wider body are part of the silhouette. Size down for less volume.",
      },
      {
        title: "Measurements",
        body: "Sample guide: S 48 cm chest / 68 cm length · M 52 / 71 · L 56 / 74 · XL 60 / 77. These are illustrative, not verified product measurements.",
      },
    ],
  },
};

function InfoPage({ page }: { page: string }) {
  const content = info[page] ?? info.faq;
  const [first, ...rest] = content.title.split(",");
  return (
    <main className="page-shell info-page">
      <Breadcrumbs items={[{ label: content.title }]} />
      <div className="info-head">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>
          {first}
          {rest.length > 0 && <>, <em>{rest.join(",")}</em></>}
        </h1>
        <p>{content.intro}</p>
      </div>
      <div className="info-sections">
        {content.sections.map((item, index) => (
          <article key={item.title}>
            <span>0{index + 1}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
      <Link className="text-link" to="/support">
        Still have a question? <ArrowRight size={15} />
      </Link>
    </main>
  );
}

function NotFound() {
  return (
    <main className="page-shell not-found">
      <span className="eyebrow">404 / Not found</span>
      <h1>
        Wrong <em>turn.</em>
      </h1>
      <p>This page isn’t part of the current run.</p>
      <Link className="button button--acid" to="/">
        Back to the start <ArrowRight size={16} />
      </Link>
    </main>
  );
}

function CategoryRoute() {
  const { categoryId } = useParams();
  const category = categories.find((item) => item.id === categoryId);
  return category ? (
    <ProductListing categoryId={category.id} title={category.title} />
  ) : (
    <NotFound />
  );
}

function AppRoutes() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const product = products.find(
      (item) => location.pathname === `/product/${item.slug}`,
    );
    const category = categories.find(
      (item) => location.pathname === `/category/${item.id}`,
    );
    const routeTitles: Record<string, string> = {
      "/": "Your own rules",
      "/shop": "Shop all",
      "/new-arrivals": "New arrivals",
      "/custom-tee": "Custom tee lab",
      "/search": "Search",
      "/wishlist": "Wish list",
      "/cart": "Your bag",
      "/checkout": "Checkout",
      "/profile": "Profile",
      "/login": "Sign in",
      "/register": "Register",
      "/support": "Support",
      "/contact": "Contact",
      "/track-order": "Track order",
      "/returns": "Returns and exchanges",
      "/shipping": "Shipping information",
      "/size-guide": "Size guide",
      "/about": "About Zero Rules",
      "/faq": "FAQ",
      "/privacy": "Privacy",
      "/terms": "Terms",
    };
    const routeLabel = location.pathname.startsWith("/upcoming/")
      ? "Coming soon"
      : routeTitles[location.pathname];
    const title = product?.name ?? category?.title ?? routeLabel ?? "Not found";
    const searchTerm = new URLSearchParams(location.search).get("q");
    const pageTitle = searchTerm ? `Search: ${searchTerm}` : title;
    const description = product?.description ??
      `${pageTitle} at Zero Rules. Original streetwear and everyday pieces.`;
    document.title =
      location.pathname === "/"
        ? "Zero Rules — your own rules"
        : `${pageTitle} — Zero Rules`;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:description"]')
      ?.setAttribute("content", description);
  }, [location.pathname, location.search]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ProductListing />} />
        <Route path="/category/:categoryId" element={<CategoryRoute />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/new-arrivals" element={<UpcomingPage />} />
        <Route path="/upcoming/:collection" element={<UpcomingPage />} />
        <Route path="/custom-tee" element={<CustomTeePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmation />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<ProfilePage />} />
        <Route path="/register" element={<ProfilePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/contact" element={<SupportPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/returns" element={<InfoPage page="returns" />} />
        <Route path="/shipping" element={<InfoPage page="shipping" />} />
        <Route path="/size-guide" element={<InfoPage page="size-guide" />} />
        <Route path="/about" element={<InfoPage page="about" />} />
        <Route path="/faq" element={<InfoPage page="faq" />} />
        <Route path="/privacy" element={<InfoPage page="privacy" />} />
        <Route path="/terms" element={<InfoPage page="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
      </BrowserRouter>
    </StoreProvider>
  );
}
