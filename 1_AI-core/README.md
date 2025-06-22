1.	Thuật Toán Minimax và Cải Tiến 
• Minimax: Thuật toán Minimax là một thuật toán tìm kiếm trò chơi tổng quát dùng cho trò chơi hai người có thông tin hoàn chỉnh, như cờ vua. Nó đi qua cây trò chơi để tìm nước đi tối ưu bằng cách giả định rằng đối thủ cũng chơi tối ưu. Trong cờ vua, nó tính toán đến một độ sâu nhất định và sử dụng một hàm đánh giá để xác định giá trị của mỗi vị trí. 

Cách hoạt động của Minimax trong Cờ Vua:
1. Cấu trúc cây trò chơi:
 	Tạo một cây trò chơi, trong đó mỗi đỉnh (node) là một trạng thái của bàn cờ.
 	Mỗi nhánh (edge) trong cây là một nước đi có thể thực hiện từ trạng thái đó.
 	Lá của cây là những trạng thái cuối cùng, ví dụ như khi một người thắng hoặc hết
lượt đi.
2. Thuật toán Minimax:
      Maximizing Player (người chơi tối đa hóa, ví dụ người chơi trắng) sẽ cố gắng tìm
nước đi làm tăng điểm số của mình (tăng cơ hội thắng).
      Minimizing Player (người chơi tối thiểu hóa, ví dụ người chơi đen) sẽ cố gắng
tìm cách làm giảm cơ hội thắng của đối phương.
3. Các bước hoạt động:
     Bắt đầu từ cây trò chơi và đệ quy tính điểm cho mỗi trạng thái của bàn cờ.
     Mỗi trạng thái được đánh giá bằng hàm đánh giá (evaluation function) dựa trên
các yếu tố như quân cờ còn lại, vị trí của quân cờ, và các yếu tố chiến lược khác.
 Minimax sẽ tìm kiếm nước đi tốt nhất bằng cách đi xuống cây trò chơi từ cây gốc,
và tại mỗi trạng thái, chọn nước đi tối ưu dựa trên chiến lược của mình:
       Nếu đến lượt Maximizing Player (người chơi trắng), chọn nước đi có giá trị
lớn nhất.
      Nếu đến lượt Minimizing Player (người chơi đen), chọn nước đi có giá trị
nhỏ nhất.


• Cải Tiến: Alpha-beta pruning là một cải tiến của thuật toán Minimax, giúp giảm đáng kể số lượng nút cần phải xem xét. Nó "cắt tỉa" các nhánh của cây không cần thiết để không cần phải đánh giá.

Cách Alpha-Beta Pruning hoạt động:
1. Alpha là giá trị tốt nhất mà người chơi Maximizing (người chơi trắng) có thể đảm bảo được tại điểm này hoặc trên một nhánh con của cây trò chơi.
2. Beta là giá trị tốt nhất mà người chơi Minimizing (người chơi đen) có thể đảm bảo được tại điểm này hoặc trên một nhánh con của cây trò chơi.
3. Cắt nhánh (pruning):
        Nếu trong quá trình tìm kiếm, ta thấy rằng một nhánh không thể mang lại giá trị
tốt hơn so với giá trị hiện tại của Alpha hoặc Beta, ta có thể cắt bỏ (không cần
tính toán) các nhánh con của nhánh đó.
      Nếu Alpha >= Beta, ta biết rằng nhánh đó sẽ không ảnh hưởng đến kết quả cuối
cùng, vì vậy ta có thể dừng tìm kiếm thêm và bỏ qua nhánh đó.

Áp dụng Alpha-Beta Pruning :
Trong trường hợp của trò chơi cờ vua, thuật toán Alpha-Beta Pruning sẽ được tích hợp vào hàm tính toán nước đi của AI. Cụ thể:
• Khi AI tìm kiếm trong cây trò chơi (dùng thuật toán Minimax), nó sẽ sử dụng AlphaBeta để cắt bỏ các nhánh không cần thiết, giảm thiểu số lượng phép toán cần thiết để tìm ra nước đi tối ưu.
• Quá trình này giúp giảm độ sâu tìm kiếm của cây trò chơi mà không ảnh hưởng đến kết quả tối ưu. Điều này đặc biệt quan trọng khi bàn cờ có nhiều quân cờ và số lượng nước đi có thể rất lớn

2.	Tính Toán Điểm và Đánh Giá Vị Trí 
• Mỗi vị trí trên bàn cờ được đánh giá dựa trên nhiều yếu tố như số lượng và loại quân còn lại, vị trí của quân cờ, cấu trúc pawns, an toàn của vua, và nhiều hơn nữa. 
• Hàm đánh giá cố gắng mô phỏng nhận thức của một người chơi cờ vua về giá trị của vị trí đó, và nó là trung tâm của bất kỳ AI cờ vua nào.


BỔ SUNG THÊM
Thuật toán Minimax là một thuật toán tìm kiếm cây (search tree) được sử dụng để xác định nước đi tối ưu trong các trò chơi hai người, nơi một bên cố gắng tối đa hóa điểm số của mình và bên kia cố gắng tối thiểu hóa điểm số của đối phương.

Mã giả Minimax
function minimax(depth, game, isMaximisingPlayer) {
    if (depth === 0 || game.game_over()) {
        return evaluateBoard(game.board());
    }

    const moves = game.moves({ verbose: true });

    if (isMaximisingPlayer) {
        let maxEval = -Infinity;
        for (const move of moves) {
            game.move(move);
            const eval = minimax(depth - 1, game, false);
            game.undo();
            maxEval = Math.max(maxEval, eval);
        }
        return maxEval;
    } else {

        let minEval = Infinity;
        for (const move of moves) {
            game.move(move);
            const eval = minimax(depth - 1, game, true);
            game.undo();
            minEval = Math.min(minEval, eval);
        }
        return minEval;
    }
}
Alpha-Beta Pruning là một cải tiến của thuật toán Minimax, giúp giảm số lượng nhánh cây trò chơi cần phải kiểm tra để tìm ra nước đi tối ưu. Điều này giúp cải thiện hiệu suất tìm kiếm bằng cách cắt bỏ các nhánh không cần thiết, tức là những nhánh không ảnh hưởng đến kết quả cuối cùng.

Mã giả Minimax với Alpha-Beta Pruning
function minimax(depth, game, alpha, beta, isMaximisingPlayer) {
    if (depth === 0) return evaluateBoard(game.board());

    const moves = game.moves({ verbose: true });

    if (isMaximisingPlayer) {
        let maxEval = -Infinity;
        for (const move of moves) {
            game.move(move);
            const eval = minimax(depth - 1, game, alpha, beta, false);
            game.undo();
            maxEval = Math.max(maxEval, eval);
            alpha = Math.max(alpha, eval);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            game.move(move);
            const eval = minimax(depth - 1, game, alpha, beta, true);
            game.undo();
            minEval = Math.min(minEval, eval);
            beta = Math.min(beta, eval);
            if (beta <= alpha) break;

        }
        return minEval;
    }
}

hàm đánh giá heuristic
Do không thể duyệt toàn bộ cây trò chơi cờ vua (quá lớn và phức tạp), hệ thống sử dụng một hàm đánh giá heuristic (hàm evaluate) để ước lượng “độ tốt” của trạng thái bàn cờ tại mỗi bước đi

1. Giá trị điểm cho mỗi quân cờ
Mỗi loại quân cờ có giá trị cơ bản thể hiện tầm quan trọng của nó. Đây là giá trị vật chất (material value). Cụ thể như sau:
Quân cờ	Ký hiệu	Giá trị cơ bản
Tốt (Pawn)	p	10
Mã (Knight)	n	30
Tượng (Bishop)	b	30
Xe (Rook)	r	50
Hậu (Queen)	q	90
Vua (King)	k	900
Lưu ý: Giá trị này có thể được nhân lên (ví dụ: 1 → 10) để dễ thấy sự khác biệt trong tính toán, nhưng vẫn giữ tỷ lệ tương đối giữa các quân.
2. Giá trị điểm cho vị trí của mỗi quân cờ
Ngoài giá trị cơ bản, mỗi quân cờ còn có giá trị vị trí phụ thuộc vào vị trí của nó trên bàn cờ (tọa độ x, y).a

Mục tiêu:
- Thưởng điểm cho những vị trí chiến lược (như kiểm soát trung tâm)
- Phạt những vị trí yếu, như ở góc bàn hoặc kẹt sau tốt

