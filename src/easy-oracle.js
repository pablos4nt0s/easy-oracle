import 'regenerator-runtime/runtime';
import oracledb from 'oracledb';

/**
 * Essa chamada executa um comando SQL no Oracle.
 * Pode receber varíaveis de bind e retorna um máximo 100 linhas por padrão.
 *
 * @remarks Exemplo:
 *
 * sql: select * from table where id_table = :id
 *
 * params: [35295]
 *
 * maxRows: 10 // limita o retorno em 10 linhas.
 *
 * @param {string} sql O comando SQL a ser executado.
 * @param {Object|Array<any>} params Um Object/Array com as varíaveis de bind.
 * @param {number} maxRows Quantidade máxima de linhas retornadas. Default: 100.
 * @returns Um resultado contendo as linhas retornadas.
 */
const query = async (sql, params = [], maxRows = 100) => {
  let conn;
  let result;
  try {
    conn = await oracledb.getConnection();
    const execution = await conn.execute(
      sql,
      params,
      {
        outFormat: oracledb.OBJECT,
        maxRows,
      },
    );
    result = execution.rows;
    await conn.close();
  } catch (e) {
    e.messsage = e;
    throw e;
  }
  return result;
};

/**
 * Essa chamada executa um comando SQL no Oracle retornado através de um ResultSet.
 * Pode receber varíaveis de bind.
 *
 * @remarks Exemplo:
 *
 * sql: select * from table where id_table = :id
 *
 * params: [35295]
 *
 * @param {string} sql O comando SQL a ser executado.
 * @param {Object|Array<any>} params Um Object/Array com as varíaveis de bind.
 * @returns Um resultado contendo as linhas retornadas.
 */
const queryResultSet = async (sql, params = []) => {
  let conn;
  let result;
  try {
    conn = await oracledb.getConnection();
    const execution = await conn.execute(
            sql,
            params,
      {
        outFormat: oracledb.OBJECT,
        resultSet: true,
      },
    );

    const retval = [];
    let row = await execution.resultSet.getRow();
    while (row) {
      retval.push(row);
      row = await execution.resultSet.getRow();
    }
    result = retval;
    await conn.close();
  } catch (e) {
    e.messsage = e;
    throw e;
  }
  return result;
};

/**
 * Essa chamada executa uma Procedure no Oracle.
 *
 * @remarks Exemplo:
 *
 * sql: testproc(:i, :io, :o)
 *
 * bindvars:
 * {
 *   i:  req.params.name,
 *   io: { val: req.query.lastname, dir: db.oracledb.BIND_INOUT },
 *   o:  { type: db.oracledb.NUMBER, dir: db.oracledb.BIND_OUT }
 * }
 * @param {string} sql nome do procedimento e seus parâmetros de entrada, saída ou entrada e saída.
 * @param {Object|Array<any>} bindvars Um Object/Array com as varíaveis de bind IN, OUT ou IN OUT.
 * @returns Um resultado contendo os valores de quaisquer varíaveis de bind OUT e IN OUT.
 */
const procedure = async (sql, bindvars) => {
  let conn;
  let result;
  try {
    conn = await oracledb.getConnection();
    const execution = await conn.execute(
            `BEGIN ${sql}; END;`,
            bindvars,
        );
    result = execution.outBinds;
    await conn.close();
  } catch (e) {
    e.messsage = e;
    throw e;
  }
  return result;
};

/**
 * Essa chamada executa um table function no Oracle.
 * Pode receber varíaveis de bind.
 *
 * @remarks Exemplo:
 *
 * sql: fnc_exemplo(:p1, :p2)
 *
 * params: [35295, 110]
 *
 * @param {string} sql O comando SQL a ser executado.
 * @param {Object|Array<any>} params Um Object/Array com as varíaveis de bind.
 * @returns Um resultado contendo as linhas retornadas.
 */
const tableFunction = async (sql, params = []) => {
  let conn;
  let result;
  try {
    conn = await oracledb.getConnection();
    const execution = await conn.execute(
            `select * from table(${sql})`,
            params,
      {
        outFormat: oracledb.OBJECT,
        resultSet: true,
      },
    );

    const retval = [];
    let row = await execution.resultSet.getRow();
    while (row) {
      retval.push(row);
      row = await execution.resultSet.getRow();
    }
    result = retval;
    await conn.close();
  } catch (e) {
    e.messsage = e;
    throw e;
  }
  return result;
};

module.exports = { query, queryResultSet, procedure, tableFunction, oracledb };
