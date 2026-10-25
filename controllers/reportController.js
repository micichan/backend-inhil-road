const pool = require('../db');

// GET: Mengambil semua data laporan
exports.getAllReports = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM laporan_kerusakan ORDER BY id DESC');
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// POST: Menambah data baru
exports.createReport = async (req, res) => {
    try {
        const { user_id, title, location, description, severity_level, image_url } = req.body;
        const query = `INSERT INTO laporan_kerusakan (user_id, title, location, description, severity_level, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [user_id, title, location, description, severity_level, image_url];
        const result = await pool.query(query, values);
        res.status(201).json({ 
            success: true, 
            message: "Laporan kerusakan jalan berhasil ditambahkan", 
            data: result.rows[0] 
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// PUT: Mengubah data berdasarkan ID
exports.updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, severity_level } = req.body;
        const query = `UPDATE laporan_kerusakan SET title = $1, description = $2, severity_level = $3 WHERE id = $4 RETURNING *`;
        const result = await pool.query(query, [title, description, severity_level, id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Laporan tidak ditemukan" });
        }
        res.status(200).json({ 
            success: true, 
            message: "Laporan berhasil diubah", 
            data: result.rows[0] 
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// DELETE: Menghapus data berdasarkan ID
exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM laporan_kerusakan WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Laporan tidak ditemukan" });
        }
        res.status(200).json({ success: true, message: "Laporan berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};