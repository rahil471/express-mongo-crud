/**
 * @swagger
 * definitions:
 *  DefaultSuccessResponse:
 *      required:
 *          - responseCode
 *          - responseMessage
 *      properties:
 *          responseCode:
 *              type: integer
 *              default: 0
 *          responseMessage:
 *              type: string
 *              default: Success
 *  DefaultErrorResponse:
 *      required:
 *          - responseCode
 *          - responseMessage
 *      properties:
 *          responseCode:
 *              type: integer
 *              default: 1
 *          responseMessage:
 *              type: string
 *              default: Error
 *  listBody:
 *      properties:
 *          params:
 *              type: object
 *              properties:
 *                  $skip:
 *                      type: number
 *                      description: The number of records to skip in the database. This is typically used in pagination.
 *                  $limit:
 *                      type: number
 *                      description: The maximum number of records to return. This is typically used in pagination.
 *                  $select:
 *                      type: array
 *                      description: A list of basic fields to be included in each resource. Valid values include any document property
 *                      items:
 *                          type: string
 *                  $sort:
 *                      type: array
 *                      items:
 *                          type: string
 *                      description: A set of fields to sort by. Including field name indicates it should be sorted ascending, while prepending '-' indicates descending. The default sort direction is 'ascending' (lowest value to highest value). Listing multiplefields prioritizes the sort starting with the first field listed.
 *                  $count:
 *                      type: boolean
 *                      description: If set to true, only a count of the query results will be returned.
 *                  $in:
 *                      type: object
 *                      description: Fields on which filter is to be applied. Valid fields inlcude properties supported by mongodb. See example below
 *                      properties:
 *                          fieldName:
 *                              type: array
 *                              items:
 *                                  type:string
 *                              default: [value1, value2]
 *                  $eq:
 *                      type: object
 *                      description: Fields on which match is to be applied. Valid fields inlcude properties supported by mongodb. See example below
 *                      properties:
 *                          fieldName:
 *                              type: any
 *                              default: 'value'
 *                  $gte:
 *                      type: object
 *                      properties:
 *                          fieldName:
 *                              type: any
 *                              default: 'value'
 *                  $gt:
 *                      type: object
 *                      properties:
 *                          fieldName:
 *                              type: any
 *                              default: 'value'
 *                  $lte:
 *                      type: object
 *                      properties:
 *                          fieldName:
 *                              type: any
 *                              default: 'value'
 *                  $lt:
 *                      type: object
 *                      properties:
 *                          fieldName:
 *                              type: any
 *                              default: 'value'
 */
