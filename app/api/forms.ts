// pages/api/forms.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const formsDirectory = path.join(process.cwd(), 'public', 'assets', 'pdf');
  
  // קבלת כל הקבצים בתיקיה
  fs.readdir(formsDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'שגיאה בהבאת הקבצים' });
    }

    // חזרה רק על הקבצים עם סיומת PDF
    const pdfFiles = files.filter((file) => file.endsWith('.pdf'));

    // מחזירים את רשימת הקבצים
    res.status(200).json(pdfFiles);
  });
}
