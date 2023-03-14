const { readFile } = require('fs/promises')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    static async csvToJson(filePath) {
        const content = await readFile(filePath, 'utf8')
        const validation = this.isvalid(content)
        if(!validation.valid) throw new Error(validation.error)

        return this.parseCSVToJson(content)
    }

    static isvalid(csvString, options = DEFAULT_OPTIONS) {
        const [headers, ...fileWithoutHeaders] = csvString.split(/\r?\n/)
        const isHeaderValid = headers === options.fields.join(',')

        if(!isHeaderValid){
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }
        
        if(!fileWithoutHeaders.length || fileWithoutHeaders.length > options.maxLines) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        
        return { valid: true }
    }

    static parseCSVToJson(csvString) {
        const [firstLine, ...lines] = csvString.split(/\r?\n/)
        const headers = firstLine.split(',')

        const users = lines.map(line => {
            const columns = line.split(',')
            const user = {}
            for(const index in columns) {
                user[headers[index]] = columns[index].trim()
            }
            return user
        })

        return users
    }
}

module.exports = File