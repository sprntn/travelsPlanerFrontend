import { Site } from "./site";

export class Travel{
    travelId!: number;

    
    userEmail!: string;
    //adultsNum!: number;
    //childrenNum!: number;
    
    beginDate!: Date;
    endDate!: Date;
    //budget!: number;
    //location
    //travelPlan!: {site: Site, dateTime: Date}[];
    travelPlan!: Array<{site: Site, dateTime: Date}>;
}