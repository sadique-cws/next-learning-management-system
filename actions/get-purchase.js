import { db } from "@/lib/db"

export const getPurchase = async () => {
    const purchases = await db.purchase.findMany({
        include: {
            course: true,
        }
    })

    const enhancedPurchases = [];

    for (const purchase of purchases) {
        // Extract userId
        const userId = purchase.userId;

        // Fetch user details from Clerk
        const user = await db.User.findUnique({
            where:{
                id:userId
            }
        });

        // Create an enhanced purchase object with user details
        const enhancedPurchase = {
            ...purchase,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };

        // Add the enhanced purchase object to the array
        enhancedPurchases.push(enhancedPurchase);
    }

    return enhancedPurchases;
}

const getStartOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const getEndOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

const getStartOfPreviousMonth = (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1);
const getEndOfPreviousMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 0, 23, 59, 59, 999);

export const getTotalPaymentAmount = async () => {
    const now = new Date();

    // Calculate the start and end dates for the current and previous months
    const startOfMonth = getStartOfMonth(now);
    const endOfMonth = getEndOfMonth(now);
    const startOfPreviousMonth = getStartOfPreviousMonth(now);
    const endOfPreviousMonth = getEndOfPreviousMonth(now);

    // Fetch all purchases
    const purchases = await prisma.purchase.findMany({
        include: {
            course: true,
        },
    });

    // Filter purchases for the current month
    const currentMonthPurchases = purchases.filter(purchase => {
        const purchaseDate = new Date(purchase.createdAt);
        return purchaseDate >= startOfMonth && purchaseDate <= endOfMonth;
    });

    // Filter purchases for the previous month
    const previousMonthPurchases = purchases.filter(purchase => {
        const purchaseDate = new Date(purchase.createdAt);
        return purchaseDate >= startOfPreviousMonth && purchaseDate <= endOfPreviousMonth;
    });

    // Calculate the total amount for the current month
    const currentMonthTotal = currentMonthPurchases.reduce((sum, purchase) => {
        return sum + (purchase.course.price || 0);
    }, 0);

    // Calculate the total amount for the previous month
    const previousMonthTotal = previousMonthPurchases.reduce((sum, purchase) => {
        return sum + (purchase.course.price || 0);
    }, 0);

    // Return the totals
    return {
        currentMonthTotal,
        previousMonthTotal,
    };
};