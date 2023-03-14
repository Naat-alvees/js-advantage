const { error } = require("./scr/constants")
const File = require("./scr/file")
const assert = require('assert')

;(async () => {
    {
        const filePath = "./mocks/emptyFile-invalid.csv"
        const expect = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expect)
    }

    {
        const filePath = "./mocks/header-invalid.csv"
        const expect = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expect)
    }
    
    {
        const filePath = "./mocks/fiveItens-invalid.csv"
        const expect = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expect)
    }
    
    {
        const filePath = "./mocks/threeItens-valid.csv"
        const expect = [
            {
                id: '1234',
                name: "Maria da silva",
                profession: "vendedora",
                age: '18'

            },
            {
                id: '3214',
                name: "João abobrinha",
                profession: "programador",
                age: '30'

            },
            {
                id: '4567',
                name: "zezinho",
                profession: "QA",
                age: '50'

            },
        ]
        const result = await File.csvToJson(filePath)
        await assert.deepStrictEqual(result, expect)
    }

    
})()