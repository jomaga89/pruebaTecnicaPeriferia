import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('social_network', 'admin', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la BD exitosa');
  } catch (error) {
    console.error('No se pudo conectar a la BD:', error);
  }
};

export default sequelize;