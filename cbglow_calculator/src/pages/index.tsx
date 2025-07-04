import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

interface PricingTier {
  distributorPrice: number; // Plus de 50 Cartons
  wholesalePrice: number;   // 10 Cartons
  retailPrice: number;      // 1 Carton
  consumerPrice: number;    // Unité
}

interface Product {
  id: number;
  designation: string;
  qty: number;
  carton: number;
  pricing: PricingTier;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      designation: "Lave-Linge Fée-Fresh (Bidon 3L)",
      qty: 4,
      carton: 1,
      image: "/products/lave_linge.jpg",
      pricing: {
        distributorPrice: 482.00,
        wholesalePrice: 531.00,
        retailPrice: 584.00,
        consumerPrice: 650.00
      }
    },
    {
      id: 2,
      designation: "Lave-Vaisselle Citron (flacon 650 mL)",
      qty: 12,
      carton: 1,
      image: "/products/liquide_vaisselle.jpg",
      pricing: {
        distributorPrice: 122.50,
        wholesalePrice: 137.00,
        retailPrice: 153.50,
        consumerPrice: 175.00
      }
    },
    {
      id: 3,
      designation: "Lave-Sol Rose (flacon 1L)",
      qty: 12,
      carton: 1,
      image: "/products/lave_sol.jpg",
      pricing: {
        distributorPrice: 112.50,
        wholesalePrice: 127.00,
        retailPrice: 144.00,
        consumerPrice: 165.00
      }
    },
    {
      id: 4,
      designation: "Désodorisant Brise de Fleurs (500 ml)",
      qty: 12,
      carton: 1,
      image: "/products/désodorisant.jpg",
      pricing: {
        distributorPrice: 132.00,
        wholesalePrice: 148.00,
        retailPrice: 165.00,
        consumerPrice: 190.00
      }
    }
  ]);

  const updateCarton = (id: number, carton: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, carton } : product
    ));
  };

  const getUnitPrice = (product: Product) => {
    if (product.carton >= 50) {
      return product.pricing.distributorPrice;
    } else if (product.carton >= 10) {
      return product.pricing.wholesalePrice;
    } else if (product.carton >= 1) {
      return product.pricing.retailPrice;
    } else {
      return product.pricing.consumerPrice;
    }
  };

  const calculateMontant = (product: Product) => {
    return product.carton * product.qty * getUnitPrice(product);
  };

  const totalMontant = products.reduce((sum, product) => sum + calculateMontant(product), 0);

  const numberToFrench = (num: number) => {
    // Simple conversion for the displayed amount
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    
    const units = ['', 'Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf'];
    const teens = ['Dix', 'Onze', 'Douze', 'Treize', 'Quatorze', 'Quinze', 'Seize', 'Dix-Sept', 'Dix-Huit', 'Dix-Neuf'];
    const tens = ['', '', 'Vingt', 'Trente', 'Quarante', 'Cinquante', 'Soixante', 'Soixante-Dix', 'Quatre-Vingt', 'Quatre-Vingt-Dix'];

    let result = '';
    
    if (thousands > 0) {
      if (thousands === 1) {
        result += 'Mille ';
      } else {
        result += units[thousands] + ' Mille ';
      }
    }
    
    if (remainder > 0) {
      const hundreds = Math.floor(remainder / 100);
      const remaining = remainder % 100;
      
      if (hundreds > 0) {
        if (hundreds === 1) {
          result += 'Cent ';
        } else {
          result += units[hundreds] + ' Cent ';
        }
      }
      
      if (remaining >= 10 && remaining <= 19) {
        result += teens[remaining - 10] + ' ';
      } else {
        const tensDigit = Math.floor(remaining / 10);
        const unitsDigit = remaining % 10;
        
        if (tensDigit > 0) {
          result += tens[tensDigit] + ' ';
        }
        
        if (unitsDigit > 0) {
          result += units[unitsDigit] + ' ';
        }
      }
    }
    
    return result.trim() + ' DA';
  };

  const getPriceCategory = (carton: number) => {
    if (carton >= 50) return "Distributeur";
    if (carton >= 10) return "Grossiste";
    if (carton >= 1) return "Détaillant";
    return "Consommateur";
  };

  return (
    <>
      <Head>
        <title>Prix Produit C&B Glow</title>
        <meta name="description" content="Delivery Note Calculator" />
        <link rel="icon" href="/cnb logomark-01.png" />
      </Head>
      <main className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-8">
        <div className="w-full bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-0 sm:mr-4">
                <Image
                  src="/cnb logomark-01.png"
                  alt="CB Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Prix Produit C&B Glow</h1>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-3 text-center">Image</th>
                  <th className="border border-gray-400 p-3 text-left">Désignation</th>
                  <th className="border border-gray-400 p-3 text-center">Carton</th>
                  <th className="border border-gray-400 p-3 text-center">Qté</th>
                  <th className="border border-gray-400 p-3 text-center">P.U.</th>
                  <th className="border border-gray-400 p-3 text-center">Catégorie</th>
                  <th className="border border-gray-400 p-3 text-center">Montant</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="border border-gray-400 p-3 text-center">
                      <div className="flex justify-center">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={product.image}
                            alt={product.designation}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <div className="font-medium">{product.designation}</div>
                    </td>
                    <td className="border border-gray-400 p-3 text-center">
                      <input
                        type="number"
                        value={product.carton}
                        onChange={(e) => updateCarton(product.id, parseInt(e.target.value) || 0)}
                        className="w-16 text-center border-none bg-transparent focus:bg-yellow-50 focus:outline-none"
                        min="0"
                      />
                    </td>
                    <td className="border border-gray-400 p-3 text-center">{product.qty}</td>
                    <td className="border border-gray-400 p-3 text-center font-semibold text-blue-600">
                      {getUnitPrice(product).toFixed(2)}
                    </td>
                    <td className="border border-gray-400 p-3 text-center text-xs">
                      <span className={`px-2 py-1 rounded text-white ${
                        product.carton >= 50 ? 'bg-green-500' :
                        product.carton >= 10 ? 'bg-blue-500' :
                        product.carton >= 1 ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {getPriceCategory(product.carton)}
                      </span>
                    </td>
                    <td className="border border-gray-400 p-3 text-center font-bold">
                      {calculateMontant(product).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td className="border border-gray-400 p-3" colSpan={6}>Total</td>
                  <td className="border border-gray-400 p-3 text-center">{totalMontant.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                <div className="flex flex-col space-y-4">
                  {/* Product Header */}
                  <div className="flex items-start space-x-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md flex-shrink-0 border border-gray-100">
                      <Image
                        src={product.image}
                        alt={product.designation}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-gray-900 mb-2 leading-tight">
                        {product.designation}
                      </h3>
                      
                      {/* Quantity Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="font-medium">Qté:</span>
                          <span className="ml-1 font-semibold text-gray-900">{product.qty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Input Section */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700">Nombre de cartons:</label>
                      <input
                        type="number"
                        value={product.carton}
                        onChange={(e) => updateCarton(product.id, parseInt(e.target.value) || 0)}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        min="0"
                      />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="flex justify-center">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium text-white ${
                        product.carton >= 50 ? 'bg-green-500' :
                        product.carton >= 10 ? 'bg-blue-500' :
                        product.carton >= 1 ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {getPriceCategory(product.carton)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Price Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Prix unitaire:</span>
                      <span className="font-bold text-blue-600 text-lg">
                        {getUnitPrice(product).toFixed(2)} DA
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 bg-blue-50 rounded-lg px-4">
                      <span className="font-semibold text-gray-900">Montant total:</span>
                      <span className="text-xl font-bold text-blue-900">
                        {calculateMontant(product).toFixed(2)} DA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Mobile Summary Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Résumé de la Commande</h3>
              <div className="space-y-3">
                {products.filter(product => product.carton > 0).map((product) => (
                  <div key={product.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 mb-1">
                        {product.designation}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span>{product.carton} carton{product.carton > 1 ? 's' : ''}</span>
                        <span className="text-blue-600 font-medium">
                          {getUnitPrice(product).toFixed(2)} DA/u
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {calculateMontant(product).toFixed(2)} DA
                      </div>
                    </div>
                  </div>
                ))}
                
                {products.filter(product => product.carton > 0).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun produit sélectionné
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Total */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-600 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">Total Général:</span>
                <span className="text-2xl font-bold text-white">
                  {totalMontant.toFixed(2)} DA
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Legend */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3 text-center sm:text-left">Barème de Prix:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center justify-center sm:justify-start p-2 bg-white rounded border">
                <span className="w-4 h-4 bg-green-500 rounded mr-3 flex-shrink-0"></span>
                <span className="text-center sm:text-left">Distributeur<br className="sm:hidden"/><span className="hidden sm:inline"> </span>(≥50 cartons)</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start p-2 bg-white rounded border">
                <span className="w-4 h-4 bg-blue-500 rounded mr-3 flex-shrink-0"></span>
                <span className="text-center sm:text-left">Grossiste<br className="sm:hidden"/><span className="hidden sm:inline"> </span>(≥10 cartons)</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start p-2 bg-white rounded border">
                <span className="w-4 h-4 bg-orange-500 rounded mr-3 flex-shrink-0"></span>
                <span className="text-center sm:text-left">Détaillant<br className="sm:hidden"/><span className="hidden sm:inline"> </span>(≥1 carton)</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start p-2 bg-white rounded border">
                <span className="w-4 h-4 bg-red-500 rounded mr-3 flex-shrink-0"></span>
                <span className="text-center sm:text-left">Consommateur<br className="sm:hidden"/><span className="hidden sm:inline"> </span>(&lt;1 carton)</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
