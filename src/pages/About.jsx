import { FaLeaf, FaHeart, FaPrayingHands, FaWind } from 'react-icons/fa';

const About = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
    <div className="text-center mb-12">
      <FaLeaf className="text-6xl text-tulsi-600 mx-auto mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Tulsi</h1>
      <p className="mt-3 text-gray-600 text-lg">The sacred plant that's been blessing Indian homes for centuries</p>
    </div>
    <div className="prose prose-lg max-w-none text-gray-700">
      <p>
        Tulsi, scientifically known as <em>Ocimum sanctum</em> or Holy Basil, holds a unique place
        in Indian culture, spirituality, and traditional medicine. At Tulsi Store, we're passionate
        about bringing this sacred herb into every home — fresh, authentic, and lovingly nurtured.
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-6 mt-12">
      {[
        { icon: <FaHeart />, title: 'Health Benefits', text: 'Boosts immunity, relieves stress, aids digestion, and supports respiratory health. A natural adaptogen.' },
        { icon: <FaPrayingHands />, title: 'Spiritual Significance', text: 'Considered a manifestation of Goddess Lakshmi, Tulsi brings peace, prosperity, and positivity to the household.' },
        { icon: <FaWind />, title: 'Air Purifier', text: 'Releases oxygen for 20 hours a day and absorbs harmful pollutants, naturally cleansing your environment.' },
        { icon: <FaLeaf />, title: 'Easy to Grow', text: 'Low maintenance, thrives in sunlight, and rewards you with fragrant leaves perfect for tea and worship.' },
      ].map((b, i) => (
        <div key={i} className="bg-tulsi-50 rounded-2xl p-6 hover:shadow-md transition">
          <div className="text-3xl text-tulsi-600 mb-3">{b.icon}</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{b.title}</h3>
          <p className="text-gray-700">{b.text}</p>
        </div>
      ))}
    </div>
    <div className="mt-16 bg-tulsi-700 text-white rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Our Promise</h2>
      <p className="text-tulsi-100 max-w-2xl mx-auto leading-relaxed">
        Every seed and plant we ship is carefully grown without harmful chemicals, hand-packed,
        and delivered with the same reverence that Tulsi deserves.
      </p>
    </div>
  </div>
);

export default About;
