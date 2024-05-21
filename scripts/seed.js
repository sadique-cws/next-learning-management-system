const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

/*
	This script is used to create categories in the Category table programmatically
	To run this script, run: "node scripts/seed.ts" in the terminal
*/
async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Web Designing" },
                { name: "Android Development" },
                { name: "Backend Development" },
                { name: "Frontend Development" },
                { name: "Computer Fundamental" },
                { name: "Data Structure" },
                { name: "Database" },
            ],
        });

        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();