import { db } from "@/lib/db";

const groupByCourse = (purchases) => {
    const grouped = {};

    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title;
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += purchase.course.price;
    });

    return grouped;
};

export const getAnalytics = async (userId) => {
    try {
        /*
			Get all the purchased course where the logged in user is the
			creator
		*/
        const purchases = await db.purchase.findMany({
            where: {
                course: {
                    userId: userId,
                },
            },
            include: {
                course: true,
            },
        });

        /*
			Use the getByCourse function above to get the total revenue
			per course title. The getByCourse function will return an
			object where each key is the course title and the value is the
			total revenue for each course
		*/
        const groupedEarnings = groupByCourse(purchases);

        /*
			Use the Object.entries and map to create an array where each
			element is an object. Hover on the data variable in order to
			get an insight on what does the operation return
		*/
        const data = Object.entries(groupedEarnings).map(
            ([courseTitle, total]) => ({
                name: courseTitle,
                total: total,
            })
        );

        /*
			Use the data variable to get the total revenue of all the courses
			the logged in user has able to sold
		*/
        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);

        /*
			Count all the courses that are purchased
		*/
        const totalSales = purchases.length;

        return {
            data,
            totalRevenue,
            totalSales,
        };
    } catch (error) {
        console.log("[GET_ANALYTICS]", error);
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0,
        };
    }
};