import { auth } from "firebase-admin";
import { db } from "../firebase";

export const getAllArticles = async (_req: any, res: any) => {
    try {
        const snapshot = await db.collection("article").get();
        const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getArticleById = async (req: any, res: any) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        const doc = await db.collection("article").doc(id).get();
        if (!doc.exists) {
            return res.status(404).json({ error: "Article not found" });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


/*
// req
{
    "id": "1akLl3pFpeRpULaw7vsBxqgjHgV2"
}

// res
{
  "id": "iBmqZk4RTtjjLKjVTAsQ"
}
*/
export const createArticle = async (req: any, res: any) => {
    // 記事を作成して、idを返す
    // 空の記事を作成する
    // ユーザidを取得
    console.log(req.body);
    const userId = req.body.id;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const newDocRef = db.collection("article").doc();
    newDocRef.set({});// / 新しいドキュメントを作成
    const newDocId = newDocRef.id;
    
    // ユーザ名をユーザidから取得
    const userName = await db.collection("users").doc(userId).get().then((doc) => {
        
        if (!doc.exists) {
            return res.status(404).json({ error: "User not found" });
        }
        return doc.data()?.name;
    });

    // articleにnewDocIdで新しい記事を作成
    const newDocRef2 = db.collection("articles").doc(newDocId);
    await newDocRef2.set({
        authors: [
            {
                userId: userId,
                userName: userName
            }
        ]
    });
    res.status(201).json({ id: newDocId });
};

export const updateArticle = async (req: any, res: any) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        const title = req.body.title || "";
        const subtitle = req.body.subtitle || "";
        const label = req.body.label || [];
        const imageUrl = req.body.imageUrl || "";
        const githubUrl = req.body.githubUrl || "";
        const deployUrl = req.body.deployUrl || "";
        const content = req.body.projectDetail || "";
        const values = {
            title,
            subtitle,
            label,
            imageUrl,
            githubUrl,
            deployUrl,
            content
        };

        const docRef = db.collection("article").doc(id);
        await docRef.update(values);
        res.status(200).json({ id });
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};       

