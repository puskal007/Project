// app/page.tsx
'use client';

import { useState } from 'react';
import { FaCalculator, FaHeartbeat, FaInfoCircle } from 'react-icons/fa';

type UnitSystem = 'metric' | 'imperial';

type BMIResult = {
  bmi: number;
  category: string;
  color: string;
  recommendation: string;
};

export default function Home() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    let heightInMeters: number;
    let weightInKg: number;

    if (unitSystem === 'metric') {
      weightInKg = parseFloat(weight);
      heightInMeters = parseFloat(height) / 100; // cm to meters
    } else {
      // Imperial calculation
      weightInKg = parseFloat(weight) * 0.453592; // lbs to kg
      const heightInInches = parseFloat(feet) * 12 + parseFloat(inches);
      heightInMeters = heightInInches * 0.0254; // inches to meters
    }

    if (isNaN(weightInKg) || isNaN(heightInMeters) || heightInMeters === 0) {
      return;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    let category = '';
    let color = '';
    let recommendation = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-500';
      recommendation = 'Consider consulting a nutritionist to gain weight healthily.';
    } else if (bmi < 25) {
      category = 'Normal';
      color = 'text-green-500';
      recommendation = 'Great! Maintain your current healthy lifestyle.';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-500';
      recommendation = 'Consider regular exercise and a balanced diet.';
    } else {
      category = 'Obese';
      color = 'text-red-500';
      recommendation = 'Consult a healthcare provider for personalized advice.';
    }

    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      color,
      recommendation,
    });
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <FaHeartbeat className="text-red-500" />
            Health Fit Tracker
            <FaHeartbeat className="text-red-500" />
          </h1>
          <p className="text-gray-600 mt-2">Calculate your BMI and get personalized health recommendations</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <FaCalculator className="text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">BMI Calculator</h2>
            </div>

            {/* Unit Selector */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Measurement System</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setUnitSystem('metric')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${unitSystem === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Metric (kg/cm)
                </button>
                <button
                  onClick={() => setUnitSystem('imperial')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${unitSystem === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Imperial (lbs/ft)
                </button>
              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4 mb-6">
              {unitSystem === 'metric' ? (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter weight in kg"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter height in cm"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Weight (lbs)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter weight in lbs"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Feet</label>
                      <input
                        type="number"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Feet"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Inches</label>
                      <input
                        type="number"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Inches"
                        min="0"
                        max="11"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={calculateBMI}
                disabled={!weight || (!height && (!feet || !inches))}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate BMI
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Results</h2>
            
            {result ? (
              <div className="space-y-6">
                {/* BMI Value */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-800 mb-2">{result.bmi}</div>
                  <div className="text-gray-600">BMI Score</div>
                </div>

                {/* Category */}
                <div className="text-center">
                  <div className={`text-2xl font-bold ${result.color} mb-2`}>{result.category}</div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${result.category === 'Underweight' ? 'bg-blue-500' : result.category === 'Normal' ? 'bg-green-500' : result.category === 'Overweight' ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(100, (result.bmi / 40) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Health Recommendation</h3>
                  <p className="text-gray-700">{result.recommendation}</p>
                </div>

                {/* BMI Categories Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-left text-gray-700">Category</th>
                        <th className="p-3 text-left text-gray-700">BMI Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="p-3 text-blue-500 font-medium">Underweight</td>
                        <td className="p-3 text-gray-700">&lt; 18.5</td>
                      </tr>
                      <tr className="border-t border-gray-200 bg-gray-50">
                        <td className="p-3 text-green-500 font-medium">Normal</td>
                        <td className="p-3 text-gray-700">18.5 - 24.9</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="p-3 text-yellow-500 font-medium">Overweight</td>
                        <td className="p-3 text-gray-700">25 - 29.9</td>
                      </tr>
                      <tr className="border-t border-gray-200 bg-gray-50">
                        <td className="p-3 text-red-500 font-medium">Obese</td>
                        <td className="p-3 text-gray-700">≥ 30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FaInfoCircle className="text-5xl mx-auto" />
                </div>
                <p className="text-gray-600">Enter your measurements and click "Calculate BMI" to see your results</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 md:mt-12 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p className="mb-2">Note: BMI is a screening tool and does not diagnose health conditions.</p>
          <p>Formula: BMI = weight(kg) / height(m)²</p>
          <p className="mt-4">© 2025 Health Fit Tracker - Group 7 Project</p>
        </footer>
      </div>
    </div>
  );
}