import { db } from "../firebase";

export const getAllUsers = async (req: any, res: any) => {
    try {
        const snapshot = await db.collection("users").get();
        const users: any[] = [];
        snapshot.forEach((doc: any) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

