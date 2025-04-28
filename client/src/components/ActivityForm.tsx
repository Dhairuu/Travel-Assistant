import { useState } from "react";

interface ActivityData {
    activityName: string;
    description: string;
    date: string;
    duration: string;
    pickup: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
}

interface ActivityFormProps {
    onSubmit: (data: ActivityData[]) => void;
    isDarkMode: boolean;
}

const ActivityForm = ({ onSubmit, isDarkMode }: ActivityFormProps) => {
    const [activities, setActivities] = useState<ActivityData[]>([{
        activityName: "",
        description: "",
        date: "",
        duration: "",
        pickup: "",
        priority: "medium",
        completed: false
    }]);

    const handleAddActivity = () => {
        setActivities([...activities, {
            activityName: "",
            description: "",
            date: "",
            duration: "",
            pickup: "",
            priority: "medium",
            completed: false
        }]);
    };

    const handleRemoveActivity = (index: number) => {
        if (activities.length > 1) {
            const newActivities = activities.filter((_, i) => i !== index);
            setActivities(newActivities);
        }
    };

    const handleInputChange = (index: number, field: keyof ActivityData, value: any) => {
        const newActivities = [...activities];
        newActivities[index] = {
            ...newActivities[index],
            [field]: value
        };
        setActivities(newActivities);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(activities);
    };

    return (
        <div className="pb-24">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg shadow-md space-y-4
                                ${isDarkMode 
                                    ? 'bg-gray-800 text-white border border-gray-700' 
                                    : 'bg-white text-gray-900 border border-gray-200'}`}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Activity {index + 1}
                                </h3>
                                {activities.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveActivity(index)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label 
                                        htmlFor={`activityName-${index}`}
                                        className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                    >
                                        Activity Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`activityName-${index}`}
                                        value={activity.activityName}
                                        onChange={(e) => handleInputChange(index, "activityName", e.target.value)}
                                        placeholder="Enter activity name"
                                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                            ${isDarkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        required
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label 
                                        htmlFor={`description-${index}`}
                                        className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id={`description-${index}`}
                                        value={activity.description}
                                        onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                        placeholder="Enter activity description"
                                        rows={3}
                                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                            ${isDarkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label 
                                        htmlFor={`date-${index}`}
                                        className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                    >
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        id={`date-${index}`}
                                        value={activity.date}
                                        onChange={(e) => handleInputChange(index, "date", e.target.value)}
                                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                            ${isDarkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label 
                                        htmlFor={`duration-${index}`}
                                        className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                    >
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        id={`duration-${index}`}
                                        value={activity.duration}
                                        onChange={(e) => handleInputChange(index, "duration", e.target.value)}
                                        placeholder="e.g., 2 hours"
                                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                            ${isDarkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label 
                                        htmlFor={`pickup-${index}`}
                                        className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                    >
                                        Pickup Location
                                    </label>
                                    <input
                                        type="text"
                                        id={`pickup-${index}`}
                                        value={activity.pickup}
                                        onChange={(e) => handleInputChange(index, "pickup", e.target.value)}
                                        placeholder="Enter pickup location"
                                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                            ${isDarkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label 
                                        htmlFor={`priority-${index}`}
                                        className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                    >
                                        Priority
                                    </label>
                                    <select
                                        id={`priority-${index}`}
                                        value={activity.priority}
                                        onChange={(e) => handleInputChange(index, "priority", e.target.value)}
                                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                                            ${isDarkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white' 
                                                : 'bg-white border-gray-300 text-gray-900'}`}
                                        required
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`completed-${index}`}
                                            checked={activity.completed}
                                            onChange={(e) => handleInputChange(index, "completed", e.target.checked)}
                                            className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary
                                                ${isDarkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                                        />
                                        <label
                                            htmlFor={`completed-${index}`}
                                            className={`ml-2 block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                        >
                                            Mark as Completed
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 mb-20">
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={handleAddActivity}
                            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-white
                                bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                                transition-colors ${isDarkMode ? 'ring-offset-gray-900' : 'ring-offset-white'}`}
                        >
                            Add Another Activity
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
                </div>
            </form>
        </div>
    );
};

export default ActivityForm; 