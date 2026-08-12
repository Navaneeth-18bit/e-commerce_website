import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings, Check, Plus, Trash2, ChevronRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { getProductById } from '@/data/products';
import { formatPrice, classNames } from '@/utils/format';
import type { Address } from '@/types';

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'settings';

export default function AccountPage() {
  const { user, updateUser, orders, wishlist, addresses, addAddress, deleteAddress } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [editing, setEditing] = useState(false);
  const [editUser, setEditUser] = useState(user);
  const [saved, setSaved] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    fullName: '',
    phone: '',
    pincode: '',
    addressLine: '',
    city: '',
    state: '',
    type: 'Home',
  });

  const wishlistedProducts = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const tabs: { key: Tab; label: string; icon: typeof User }[] = [
    { key: 'profile', label: 'My Profile', icon: User },
    { key: 'orders', label: 'My Orders', icon: Package },
    { key: 'wishlist', label: 'My Wishlist', icon: Heart },
    { key: 'addresses', label: 'My Addresses', icon: MapPin },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  function handleSaveProfile() {
    updateUser(editUser);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleAddAddress() {
    if (newAddress.fullName && newAddress.addressLine && newAddress.city) {
      addAddress(newAddress);
      setNewAddress({ fullName: '', phone: '', pincode: '', addressLine: '', city: '', state: '', type: 'Home' });
      setShowNewAddress(false);
    }
  }

  return (
    <div className="container-app py-8 lg:py-12">
      <h1 className="mb-8 font-display text-3xl font-medium sm:text-4xl">My Account</h1>

      <div className="grid gap-8 lg:grid-cols-4 lg:gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="border border-ink-200 bg-cream-50">
            <div className="border-b border-ink-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-lg font-medium text-cream-50">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-ink-400">{user.email}</p>
                </div>
              </div>
            </div>
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={classNames(
                      'flex w-full items-center gap-3 px-3 py-3 text-left text-sm font-medium transition-colors',
                      activeTab === tab.key ? 'bg-ink-900 text-cream-50' : 'text-ink-700 hover:bg-cream-200'
                    )}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                    {tab.label}
                    {tab.key === 'wishlist' && wishlist.length > 0 && (
                      <span className={classNames('ml-auto text-xs', activeTab === tab.key ? 'text-cream-50/70' : 'text-ink-400')}>
                        {wishlist.length}
                      </span>
                    )}
                    {tab.key === 'orders' && orders.length > 0 && (
                      <span className={classNames('ml-auto text-xs', activeTab === tab.key ? 'text-cream-50/70' : 'text-ink-400')}>
                        {orders.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="border border-ink-200 bg-cream-50 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium">Profile Information</h2>
                {!editing ? (
                  <button onClick={() => { setEditUser(user); setEditing(true); }} className="btn-ghost text-sm">
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(false)} className="btn-ghost text-sm">Cancel</button>
                    <button onClick={handleSaveProfile} className="btn-primary px-4 py-2 text-xs">
                      <Check size={14} /> Save
                    </button>
                  </div>
                )}
              </div>

              {saved && (
                <p className="mb-4 flex items-center gap-2 text-sm text-success-600 animate-fade-in">
                  <Check size={16} /> Profile updated successfully
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { key: 'name', label: 'Full Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'gender', label: 'Gender' },
                  { key: 'dob', label: 'Date of Birth' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="label-xs mb-1.5 block">{field.label}</label>
                    {editing ? (
                      <input
                        type={field.key === 'dob' ? 'date' : 'text'}
                        value={(editUser as never as Record<string, string>)[field.key]}
                        onChange={(e) => setEditUser({ ...editUser, [field.key]: e.target.value })}
                        className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                      />
                    ) : (
                      <p className="text-sm font-medium text-ink-900">
                        {(user as never as Record<string, string>)[field.key] || '—'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="mb-5 text-lg font-medium">Order History</h2>
              {orders.length === 0 ? (
                <div className="border border-ink-200 bg-cream-50 p-12 text-center">
                  <Package size={32} strokeWidth={1} className="mx-auto mb-3 text-ink-400" />
                  <p className="text-sm text-ink-400">No orders yet.</p>
                  <Link to="/shop" className="btn-secondary mt-4 inline-flex">Start Shopping</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <Link
                      key={order.id}
                      to={`/orders/${order.id}`}
                      className="group flex items-center justify-between border border-ink-200 bg-cream-50 p-4 transition-all hover:border-ink-900"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                          {order.items.slice(0, 2).map((item, i) => (
                            <img key={i} src={item.image} alt={item.name} className="h-12 w-10 border-2 border-cream-50 object-cover" />
                          ))}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{order.id}</p>
                          <p className="text-xs text-ink-400">{order.items.length} items · {formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-ink-400 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 className="mb-5 text-lg font-medium">Saved Items</h2>
              {wishlistedProducts.length === 0 ? (
                <div className="border border-ink-200 bg-cream-50 p-12 text-center">
                  <Heart size={32} strokeWidth={1} className="mx-auto mb-3 text-ink-400" />
                  <p className="text-sm text-ink-400">Your wishlist is empty.</p>
                  <Link to="/shop" className="btn-secondary mt-4 inline-flex">Explore Shirts</Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {wishlistedProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.slug}`} className="group block">
                      <div className="aspect-[3/4] overflow-hidden bg-cream-200">
                        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      </div>
                      <p className="mt-2 text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-sm font-semibold">{formatPrice(product.discountPrice)}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses */}
          {activeTab === 'addresses' && (
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-medium">Saved Addresses</h2>
                <button onClick={() => setShowNewAddress(!showNewAddress)} className="btn-secondary px-4 py-2 text-xs">
                  <Plus size={14} /> Add New
                </button>
              </div>

              {showNewAddress && (
                <div className="mb-4 space-y-4 border border-ink-200 bg-cream-50 p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input type="text" placeholder="Full Name" value={newAddress.fullName} onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })} className="border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm" />
                    <input type="tel" placeholder="Phone" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} className="border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm" />
                  </div>
                  <input type="text" placeholder="Address Line" value={newAddress.addressLine} onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })} className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm" />
                    <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} className="border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm" />
                    <input type="text" placeholder="Pincode" value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} className="border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm" />
                  </div>
                  <button onClick={handleAddAddress} className="btn-primary px-4 py-2 text-xs">Save Address</button>
                </div>
              )}

              <div className="space-y-3">
                {addresses.map((addr, i) => (
                  <div key={i} className="border border-ink-200 bg-cream-50 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{addr.fullName}</p>
                          <span className="border border-ink-200 px-2 py-0.5 text-2xs text-ink-500">{addr.type}</span>
                        </div>
                        <p className="mt-1 text-sm text-ink-500">
                          {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="mt-1 text-sm text-ink-500">{addr.phone}</p>
                      </div>
                      <button
                        onClick={() => deleteAddress(i)}
                        className="text-ink-400 transition-colors hover:text-accent-500"
                        aria-label="Delete address"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="border border-ink-200 bg-cream-50 p-6">
                <h2 className="mb-4 text-lg font-medium">Notifications</h2>
                <div className="space-y-3">
                  {['Order updates', 'New arrivals', 'Sale & promotions', 'Newsletter'].map((item) => (
                    <label key={item} className="flex items-center justify-between">
                      <span className="text-sm text-ink-700">{item}</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-ink-900" />
                    </label>
                  ))}
                </div>
              </div>
              <div className="border border-ink-200 bg-cream-50 p-6">
                <h2 className="mb-4 text-lg font-medium">Preferences</h2>
                <div className="space-y-3">
                  <div>
                    <label className="label-xs mb-1.5 block">Language</label>
                    <select className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm">
                      <option>English</option>
                      <option>हिन्दी</option>
                      <option>தமிழ்</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-xs mb-1.5 block">Currency</label>
                    <select className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm">
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
