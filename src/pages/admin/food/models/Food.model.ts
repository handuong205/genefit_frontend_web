export type Food = {
  foodId: number;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  nutritionInfo: string;
  isPublic: boolean;
  approvalStatus: string;
  createdByUserId: number;
  isDeleted: boolean;
  
};

export type PageInfo = {
  pageNum: number;
  pageSize: number;
};

export type FoodSearchResponse = {
  content: Food[];
  pageInfo: PageInfo;
};