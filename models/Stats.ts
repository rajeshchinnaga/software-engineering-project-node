/**
 * @typedef Tuit Stats tuits posted on the tuit
 * @property {number} replies reply count on a tuit
 * @property {number} retuits retuits count a tuit
 * @property {number} likes likes count a tuit 
 * @property {number} dislikes dislikes count a tuit
 */
export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number,
    dislikes:number
}; 