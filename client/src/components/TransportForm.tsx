import { useState } from "react";

interface TransportData {
    transportType: string;
    serviceProvider?: string;
    vehicleType?: string;
    bookingID?: string;
    busCompany?: string;
    busNumber?: string;
    busName?: string;
    PNR?: string;
    trainCompany?: string;
    trainNumber?: string;
    trainName?: string;
    airline?: string;
    flightNumber?: string;
    bookingReference?: string;
    seatNumber?: string;
    boardingTime?: string;
    departureCity: string;
    arrivalCity: string;
    departureDate: string;
    arrivalDate: string;
}

interface TransportFormProps {
    onSubmit: (data: TransportData[]) => void;
    isDarkMode: boolean;
}

const TransportForm = ({ onSubmit, isDarkMode }: TransportFormProps) => {
    const [forms, setForms] = useState<TransportData[]>([{
        transportType: "car",
        departureCity: "",
        arrivalCity: "",
        departureDate: "",
        arrivalDate: ""
    }]);

    const handleAddForm = () => {
        setForms([...forms, {
            transportType: "car",
            departureCity: "",
            arrivalCity: "",
            departureDate: "",
            arrivalDate: ""
        }]);
    };

    const handleRemoveForm = (index: number) => {
        if (forms.length > 1) {
            const newForms = forms.filter((_, i) => i !== index);
            setForms(newForms);
        }
    };

    const handleTransportTypeChange = (index: number, value: string) => {
        const newForms = [...forms];
        newForms[index] = {
            ...newForms[index],
            transportType: value
        };
        setForms(newForms);
    };

    const handleInputChange = (index: number, field: keyof TransportData, value: string) => {
        const newForms = [...forms];
        newForms[index] = {
            ...newForms[index],
            [field]: value
        };
        setForms(newForms);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(forms);
    };

    return (
        <div className={`space-y-6 ${isDarkMode ? 'dark' : ''}`}>
            <form onSubmit={handleSubmit} className="space-y-8">
                {forms.map((form, index) => (
                    <div 
                        key={index} 
                        className={`p-6 rounded-lg shadow-md space-y-4 relative
                            ${isDarkMode 
                                ? 'bg-gray-800 text-white border border-gray-700' 
                                : 'bg-white text-gray-900 border border-gray-200'}`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Transport {index + 1}
                            </h3>
                            {forms.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveForm(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label 
                                    htmlFor={`transportType-${index}`}
                                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Transport Type
                                </label>
                                <select
                                    name={`transportType-${index}`}
                                    id={`transportType-${index}`}
                                    value={form.transportType}
                                    onChange={(e) => handleTransportTypeChange(index, e.target.value)}
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-white border-gray-300 text-gray-900'}`}
                                >
                                    <option value="car">Car</option>
                                    <option value="bus">Bus</option>
                                    <option value="train">Train</option>
                                    <option value="plane">Plane</option>
                                </select>
                            </div>

                            {form.transportType === "car" && (
                                <>
                                    <div className="space-y-2">
                                        <label 
                                            htmlFor={`serviceProvider-${index}`}
                                            className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                        >
                                            Service Provider
                                        </label>
                                        <input
                                            type="text"
                                            id={`serviceProvider-${index}`}
                                            value={form.serviceProvider || ""}
                                            onChange={(e) => handleInputChange(index, "serviceProvider", e.target.value)}
                                            placeholder="Enter the service provider name"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`vehicleType-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Vehicle Type</label>
                                        <input
                                            type="text"
                                            id={`vehicleType-${index}`}
                                            value={form.vehicleType || ""}
                                            onChange={(e) => handleInputChange(index, "vehicleType", e.target.value)}
                                            placeholder="Enter the vehicle type"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`bookingID-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Booking ID</label>
                                        <input
                                            type="text"
                                            id={`bookingID-${index}`}
                                            value={form.bookingID || ""}
                                            onChange={(e) => handleInputChange(index, "bookingID", e.target.value)}
                                            placeholder="Enter the booking ID"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                </>
                            )}

                            {form.transportType === "bus" && (
                                <>
                                    <div>
                                        <label htmlFor={`busCompany-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Bus Company</label>
                                        <input
                                            type="text"
                                            id={`busCompany-${index}`}
                                            value={form.busCompany || ""}
                                            onChange={(e) => handleInputChange(index, "busCompany", e.target.value)}
                                            placeholder="Enter the bus company name"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`busNumber-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Bus Number</label>
                                        <input
                                            type="text"
                                            id={`busNumber-${index}`}
                                            value={form.busNumber || ""}
                                            onChange={(e) => handleInputChange(index, "busNumber", e.target.value)}
                                            placeholder="Enter the bus number"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`busName-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Bus Name</label>
                                        <input
                                            type="text"
                                            id={`busName-${index}`}
                                            value={form.busName || ""}
                                            onChange={(e) => handleInputChange(index, "busName", e.target.value)}
                                            placeholder="Enter the bus name"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`busPNR-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>PNR Number</label>
                                        <input
                                            type="text"
                                            id={`busPNR-${index}`}
                                            value={form.PNR || ""}
                                            onChange={(e) => handleInputChange(index, "PNR", e.target.value)}
                                            placeholder="Enter the PNR number"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                </>
                            )}

                            {form.transportType === "train" && (
                                <>
                                    <div>
                                        <label htmlFor={`trainCompany-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Train Company</label>
                                        <input
                                            type="text"
                                            id={`trainCompany-${index}`}
                                            value={form.trainCompany || ""}
                                            onChange={(e) => handleInputChange(index, "trainCompany", e.target.value)}
                                            placeholder="Enter the train company name"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`trainNumber-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Train Number</label>
                                        <input
                                            type="text"
                                            id={`trainNumber-${index}`}
                                            value={form.trainNumber || ""}
                                            onChange={(e) => handleInputChange(index, "trainNumber", e.target.value)}
                                            placeholder="Enter the train number"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`trainName-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Train Name</label>
                                        <input
                                            type="text"
                                            id={`trainName-${index}`}
                                            value={form.trainName || ""}
                                            onChange={(e) => handleInputChange(index, "trainName", e.target.value)}
                                            placeholder="Enter the train name"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`trainPNR-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>PNR Number</label>
                                        <input
                                            type="text"
                                            id={`trainPNR-${index}`}
                                            value={form.PNR || ""}
                                            onChange={(e) => handleInputChange(index, "PNR", e.target.value)}
                                            placeholder="Enter the PNR number"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                </>
                            )}

                            {form.transportType === "plane" && (
                                <>
                                    <div>
                                        <label htmlFor={`airline-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Airline</label>
                                        <input
                                            type="text"
                                            id={`airline-${index}`}
                                            value={form.airline || ""}
                                            onChange={(e) => handleInputChange(index, "airline", e.target.value)}
                                            placeholder="Enter the airline name"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`flightNumber-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Flight Number</label>
                                        <input
                                            type="text"
                                            id={`flightNumber-${index}`}
                                            value={form.flightNumber || ""}
                                            onChange={(e) => handleInputChange(index, "flightNumber", e.target.value)}
                                            placeholder="Enter the flight number"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`bookingReference-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Booking Reference</label>
                                        <input
                                            type="text"
                                            id={`bookingReference-${index}`}
                                            value={form.bookingReference || ""}
                                            onChange={(e) => handleInputChange(index, "bookingReference", e.target.value)}
                                            placeholder="Enter the booking reference"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`seatNumber-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Seat Number</label>
                                        <input
                                            type="text"
                                            id={`seatNumber-${index}`}
                                            value={form.seatNumber || ""}
                                            onChange={(e) => handleInputChange(index, "seatNumber", e.target.value)}
                                            placeholder="Enter the seat number"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`boardingTime-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Boarding Time</label>
                                        <input
                                            type="text"
                                            id={`boardingTime-${index}`}
                                            value={form.boardingTime || ""}
                                            onChange={(e) => handleInputChange(index, "boardingTime", e.target.value)}
                                            placeholder="Enter the boarding time"
                                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                                ${isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <label 
                                    htmlFor={`departureCity-${index}`}
                                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Departure City
                                </label>
                                <input
                                    type="text"
                                    id={`departureCity-${index}`}
                                    value={form.departureCity}
                                    onChange={(e) => handleInputChange(index, "departureCity", e.target.value)}
                                    placeholder="Enter the departure city"
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                />
                            </div>
                            <div>
                                <label htmlFor={`arrivalCity-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Arrival City</label>
                                <input
                                    type="text"
                                    id={`arrivalCity-${index}`}
                                    value={form.arrivalCity}
                                    onChange={(e) => handleInputChange(index, "arrivalCity", e.target.value)}
                                    placeholder="Enter the arrival city"
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                />
                            </div>
                            <div>
                                <label htmlFor={`departureDate-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Departure Date</label>
                                <input
                                    type="date"
                                    id={`departureDate-${index}`}
                                    value={form.departureDate}
                                    onChange={(e) => handleInputChange(index, "departureDate", e.target.value)}
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                />
                            </div>
                            <div>
                                <label htmlFor={`arrivalDate-${index}`} className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Arrival Date</label>
                                <input
                                    type="date"
                                    id={`arrivalDate-${index}`}
                                    value={form.arrivalDate}
                                    onChange={(e) => handleInputChange(index, "arrivalDate", e.target.value)}
                                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                        ${isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex justify-between items-center pt-4">
                    <button
                        type="button"
                        onClick={handleAddForm}
                        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-white
                            bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                            transition-colors ${isDarkMode ? 'ring-offset-gray-900' : 'ring-offset-white'}`}
                    >
                        Add Another Transport
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

export default TransportForm;