import { formatPrice } from "@/lib/format";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export const DataCard = ({ value, label, shouldFormat }) => {
   
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {shouldFormat ? (typeof value == "object") ? formatPrice(value.currentMonthTotal) : formatPrice(value) : value}
                </div>
                <p className="text-slate-500 text-xs mt-2">{(typeof value === "object") && `Last Months: ${formatPrice(value.previousMonthTotal)}`}</p>

            </CardContent>
        </Card>
    );
};