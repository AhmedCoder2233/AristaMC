"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaSpinner, FaArrowLeft, FaCopy } from "react-icons/fa";

const bankDetails = {
  accountName: "ARISTAMC INC.",
  accountNumber: "1234567890",
  bankName: "Chase Bank",
  routingNumber: "021000021",
  swiftCode: "CHASUS33",
  bankAddress: "383 Madison Avenue, New York, NY 10179, USA",
};

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "card" | null>(
    null
  );
  const [referenceNumber] = useState(
    `ARISTA-${Math.floor(10000 + Math.random() * 90000)}`
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState("");

  const handleBankTransfer = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setIsSuccess(true);

    localStorage.setItem(
      "lastPayment",
      JSON.stringify({
        method: "bank_transfer",
        details: bankDetails,
        reference: referenceNumber,
        date: new Date().toISOString(),
        status: "pending_verification",
      })
    );
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(""), 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-green-500 text-6xl mb-4 flex justify-center">
            <FaCheckCircle />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Received!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order is confirmed. Thank you for your payment!
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-sm text-gray-500">
                  Bank Name
                </h2>
                <p>{bankDetails.bankName}</p>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(bankDetails.bankName, "bankName")
                }
                className="text-blue-600 hover:text-blue-800"
              >
                <FaCopy />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-sm text-gray-500">
                  Account Name
                </h2>
                <p>{bankDetails.accountName}</p>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(bankDetails.accountName, "accountName")
                }
                className="text-blue-600 hover:text-blue-800"
              >
                <FaCopy />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-sm text-gray-500">
                  Account Number
                </h2>
                <p>{bankDetails.accountNumber}</p>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(bankDetails.accountNumber, "accountNumber")
                }
                className="text-blue-600 hover:text-blue-800"
              >
                <FaCopy />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-sm text-gray-500">
                  Routing Number
                </h2>
                <p>{bankDetails.routingNumber}</p>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(bankDetails.routingNumber, "routingNumber")
                }
                className="text-blue-600 hover:text-blue-800"
              >
                <FaCopy />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-sm text-gray-500">
                  SWIFT Code
                </h2>
                <p>{bankDetails.swiftCode}</p>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(bankDetails.swiftCode, "swiftCode")
                }
                className="text-blue-600 hover:text-blue-800"
              >
                <FaCopy />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-sm text-gray-500">
                  Reference
                </h2>
                <p className="font-mono">{referenceNumber}</p>
              </div>
              <button
                onClick={() => copyToClipboard(referenceNumber, "reference")}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaCopy />
              </button>
            </div>

            {copied && (
              <div className="text-green-600 text-sm mt-2">
                Copied {copied} to clipboard!
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
            <p className="text-yellow-700 text-sm">
              <strong>Note:</strong> Your order will be processed within 24
              hours of payment verification. You'll receive a confirmation email
              once completed.
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Cart
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Complete Your Payment
        </h1>

        {!paymentMethod ? (
          <div className="space-y-4">
            <h2 className="font-medium text-gray-700">Select Payment Method</h2>

            <button
              onClick={() => setPaymentMethod("bank")}
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">B</span>
                </div>
                <span className="font-medium">Bank Transfer</span>
              </div>
              <span className="text-gray-500">→</span>
            </button>

            <button
              onClick={() => setPaymentMethod("card")}
              disabled
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors opacity-50 cursor-not-allowed"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">C</span>
                </div>
                <span className="font-medium">
                  Credit/Debit Card (Coming Soon)
                </span>
              </div>
              <span className="text-gray-500">→</span>
            </button>
          </div>
        ) : paymentMethod === "bank" ? (
          <div>
            <h2 className="font-medium text-gray-700 mb-4">
              Bank Transfer Instructions
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm">
                Please transfer the exact amount to our bank account. After
                payment, your rank will be activated within 24 hours.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="border-b pb-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Bank Details
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Bank Name</p>
                    <p className="font-medium">{bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Name</p>
                    <p className="font-medium">{bankDetails.accountName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="font-medium">{bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Routing Number</p>
                    <p className="font-medium">{bankDetails.routingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">SWIFT Code</p>
                    <p className="font-medium">{bankDetails.swiftCode}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Reference Number
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={referenceNumber}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50 font-mono"
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(referenceNumber, "reference")
                    }
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r-lg border border-l-0 border-gray-300"
                  >
                    <FaCopy />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Include this reference in your transfer
                </p>
              </div>
            </div>

            <button
              onClick={handleBankTransfer}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "I've Completed the Transfer"
              )}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
