export type CreateFoodRequest = {
    adminId?: number;
    foodName: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    nutritionInfo: string;
};