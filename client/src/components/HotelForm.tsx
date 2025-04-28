import { useState } from "react";

interface HotelData {
    hotelName: string;
    address: string;
    city: string;
    checkInDate: string;
    checkOutDate: string;
    bookingReference: string;
}

interface HotelFormProps {
    onSubmit: (data: HotelData[]) => void;
    isDarkMode: boolean;
}

const HotelForm = ({ onSubmit, isDarkMode }: HotelFormProps) => {
    const [hotels, setHotels] = useState<HotelData[]>([{
        hotelName: "",
        address: "",
        city: "",
        checkInDate: "",
        checkOutDate: "",
        bookingReference: ""
    }]);

    const handleAddHotel = () => {
        setHotels([...hotels, {
            hotelName: "",
            address: "",
            city: "",
            checkInDate: "",
            checkOutDate: "",
            bookingReference: ""
        }]);
    };

    const handleRemoveHotel = (index: number) => {
        if (hotels.length > 1) {
            const newHotels = hotels.filter((_, i) => i !== index);
            setHotels(newHotels);
        }
    };

    const handleInputChange = (index: number, field: keyof HotelData, value: string) => {
        const newHotels = [...hotels];
        newHotels[index] = {
            ...newHotels[index],
            [field]: value
        };
        setHotels(newHotels);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(hotels);
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-8">
                {hotels.map((hotel, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-lg shadow-md space-y-4 relative
                            ${isDarkMode 
                                ? 'bg-gray-800 text-white border border-gray-700' 
                                : 'bg-white text-gray-900 border border-gray-200'}`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Hotel {index + 1}
                            </h3>
                            {hotels.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveHotel(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label 
                                    htmlFor={`hotelName-${index}`}
                                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Hotel Name
                                </label>
                                <input
                                    type="text"
                                    id={`hotelName-${index}`}
                                    value={hotel.hotelName}
                                    onChange={(e) => handleInputChange(index, "hotelName", e.target.value)}
                                    placeholder="Enter hotel name"
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label 
                                    htmlFor={`address-${index}`}
                                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id={`address-${index}`}
                                    value={hotel.address}
                                    onChange={(e) => handleInputChange(index, "address", e.target.value)}
                                    placeholder="Enter hotel address"
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label 
                                    htmlFor={`city-${index}`}
                                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    id={`city-${index}`}
                                    value={hotel.city}
                                    onChange={(e) => handleInputChange(index, "city", e.target.value)}
                                    placeholder="Enter city"
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label 
                                    htmlFor={`checkInDate-${index}`}
                                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Check-in Date
                                </label>
                                <input
                                    type="date"
                                    id={`checkInDate-${index}`}
                                    value={hotel.checkInDate}
                                    onChange={(e) => handleInputChange(index, "checkInDate", e.target.value)}
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label 
                                    htmlFor={`checkOutDate-${index}`}
                                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Check-out Date
                                </label>
                                <input
                                    type="date"
                                    id={`checkOutDate-${index}`}
                                    value={hotel.checkOutDate}
                                    onChange={(e) => handleInputChange(index, "checkOutDate", e.target.value)}
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label 
                                    htmlFor={`bookingReference-${index}`}
                                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Booking Reference
                                </label>
                                <input
                                    type="text"
                                    id={`bookingReference-${index}`}
                                    value={hotel.bookingReference}
                                    onChange={(e) => handleInputChange(index, "bookingReference", e.target.value)}
                                    placeholder="Enter booking reference number"
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex justify-between items-center pt-4">
                    <button
                        type="button"
                        onClick={handleAddHotel}
                        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-white
                            bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                            transition-colors ${isDarkMode ? 'ring-offset-gray-900' : 'ring-offset-white'}`}
                    >
                        Add Another Hotel
                    </button>

                    <button
                        type="submit"
                        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium text-white
                            bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                            transition-colors ${isDarkMode ? 'ring-offset-gray-900' : 'ring-offset-white'}`}
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HotelForm; 