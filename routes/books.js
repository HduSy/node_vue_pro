const express = require('express')
const router = express.Router()

const Book = require('./../models/book')
/**
 * query all
 */
router.get('/books', (req, res) => {
    Book.find(req.body, (err, ret) => {
        if (err) {
            res.json({
                code: 500,
                msg: '查询失败',
                total: 0,
                page: 1,
                size: 20,
                list: []
            })
        } else {
            res.json({
                code: 0,
                msg: '查询成功',
                total: ret.length,
                page: 1,
                size: 20,
                list: ret
            })
        }
    })
})
/**
 * single post
 */
router.post('/books', (req, res) => {
    new Book(req.body).save(err => {
        if (err) {
            res.json({
                code: 500,
                msg: '新增失败',
                count: 0
            })
        } else {
            res.json({
                code: 1,
                msg: '新增成功',
                count: 1
            })
        }
    })
})
/**
 * single delete
 */
router.delete('/books', (req, res) => {
    Book.deleteOne(req.body, err => {
        if (err) {
            res.json({
                code: 500,
                msg: '删除失败',
                count: 0
            })
        } else {
            res.json({
                code: 2,
                msg: '删除成功',
                count: 1
            })
        }
    })
})
/**
 * single update
 */
router.put('/books', (req, res) => {
    Book.updateOne({_id: req.body._id}, req.body, err => {
        if (err) {
            res.json({
                code: 500,
                msg: '编辑失败',
                count: 0
            })
        } else {
            res.json({
                code: 3,
                msg: '编辑成功',
                count: 1
            })
        }
    })
})
module.exports = router
