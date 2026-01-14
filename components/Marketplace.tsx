
import React, { useEffect, useState } from 'react';
import { ShoppingBag, BookOpen, Wrench, Download, Star, ChevronLeft, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    type: 'EBOOK' | 'TOOL' | 'COURSE' | 'MODULE';
    imageUrl?: string;
}

const Marketplace: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'EBOOK' | 'TOOL'>('ALL');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/subscriptions/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuy = (product: Product) => {
        // Mock Purchase Flow
        if (confirm(`Purchase "${product.title}" for GHS ${product.price}?`)) {
            alert("Redirecting to Paystack...");
            // Real implementation: POST /api/subscriptions/purchase -> Get Payment Link
        }
    };

    const filteredProducts = filter === 'ALL'
        ? products
        : products.filter(p => p.type === filter);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 pt-8 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold uppercase text-xs tracking-widest transition-colors mb-8">
                        <ChevronLeft size={16} /> Back to Home
                    </button>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h1 className="text-4xl font-black mb-2">Osikani <span className="text-emerald-600">Store</span></h1>
                            <p className="text-slate-500 text-lg">Digital tools to accelerate your financial independence.</p>
                        </div>

                        <div className="flex gap-2">
                            {['ALL', 'EBOOK', 'TOOL'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${filter === f
                                            ? 'bg-slate-900 text-white shadow-lg'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {f === 'ALL' ? 'All Products' : f + 's'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading store items...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1">
                                <div className="h-48 bg-slate-100 rounded-2xl mb-6 overflow-hidden relative">
                                    {product.imageUrl ? (
                                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            {product.type === 'EBOOK' ? <BookOpen size={48} /> : <Wrench size={48} />}
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-800 shadow-sm">
                                        {product.type}
                                    </div>
                                </div>

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{product.title}</h3>
                                    <div className="text-emerald-600 font-black text-lg whitespace-nowrap">
                                        GHS {product.price}
                                    </div>
                                </div>

                                <p className="text-slate-500 text-sm mb-6 line-clamp-2 min-h-[40px]">{product.description}</p>

                                <button
                                    onClick={() => handleBuy(product)}
                                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-lg group-hover:shadow-emerald-900/20"
                                >
                                    <ShoppingBag size={18} /> Buy Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-300">
                        <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500">No products found yet. Working on it!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Marketplace;
