import  Evento from './evento';
import  Favorito  from './favorito';

interface ItemDeFavorito {
    id?: number;
    classificacao: number;
    evento: Evento;
    favorito: Favorito;
}

export default ItemDeFavorito;
