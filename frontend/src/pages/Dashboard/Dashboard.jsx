import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell
} from "recharts";
import dayjs from "dayjs";
import "./Dashboard.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

function Dashboard() {
    const [salesData, setSalesData] = useState([]);
    const [topStockData, setTopStockData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salesRes, productsRes] = await Promise.all([
                    axios.get("http://localhost:3333/sales"),
                    axios.get("http://localhost:3333/products"),
                ]);

                const sales = salesRes.data;
                const products = productsRes.data;

                const now = dayjs();
                const salesLast10h = Array.from({ length: 10 }).map((_, i) => {
                    const targetHour = now.subtract(9 - i, "hour");
                    const label = `${targetHour.format("HH")}h`;

                    const total = sales.reduce((sum, sale) => {
                        const saleDate = dayjs(sale.createdAt);
                        const sameHour = saleDate.format("YYYY-MM-DD HH") === targetHour.format("YYYY-MM-DD HH");

                        if (sameHour && Array.isArray(sale.items)) {
                            return sum + sale.items.reduce((acc, item) => acc + (Number(item.qty_total) || 0), 0);
                        }

                        return sum;
                    }, 0);

                    return { hour: label, total };
                });

                const sorted = [...products].sort((a, b) => b.stock - a.stock);
                const top3 = sorted.slice(0, 3).map((p) => ({
                    name: p.name,
                    stock: p.stock,
                }));

                setSalesData(salesLast10h);
                setTopStockData(top3);
            } catch (err) {
                console.error("Erro ao carregar dados do dashboard:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Bem-vindo ao Dashboard</h2>

            <div className="grid-container">
                <div className="section">
                    <h3 className="section-title">Vendas nas Últimas 10 Horas</h3>
                    <div className="chart-wrapper">
                        <BarChart width={400} height={300} data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#8884d8" name="Qtd Vendida" />
                        </BarChart>
                    </div>
                </div>

                <div className="section">
                    <h3 className="section-title">Top 3 Produtos com Maior Estoque</h3>
                    <div className="chart-wrapper">
                        <PieChart width={400} height={300}>
                            <Pie
                                data={topStockData}
                                cx={200}
                                cy={150}
                                outerRadius={100}
                                dataKey="stock"
                                nameKey="name"
                                label
                            >
                                {topStockData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
