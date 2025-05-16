export default function FAQ() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">What is this dashboard for?</h2>
          <p className="text-gray-600">This dashboard helps you manage and monitor your products and business activities.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">How do I add new products?</h2>
          <p className="text-gray-600">You can add new products through the Products page using the Add Product button.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Can I customize the dashboard?</h2>
          <p className="text-gray-600">Yes, the dashboard can be customized to meet your specific needs and preferences.</p>
        </div>
      </div>
    </div>
  )
}