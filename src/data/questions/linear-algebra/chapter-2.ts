// data/questions/linear-algebra/chapter-2-part1.ts

import { QuizQuestion } from '@/types/quiz-types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the Normal Form of a matrix?",
    options: [
      "A matrix where all elements are normal distributions",
      "A standardized representation achieved through elementary row and column operations",
      "A matrix that has been normalized by dividing by its determinant",
      "A matrix with all eigenvalues equal to 1"
    ],
    correctAnswer: 1,
    explanation: "The Normal Form of a matrix is a standardized representation achieved through elementary row and column operations that highlights the matrix's rank structure."
  },
  {
    id: 2,
    question: "For a matrix A of size m×n with rank r, what is its Normal Form?",
    options: [
      "A block matrix with the identity matrix in the upper left and zeros elsewhere",
      "A block matrix with the identity matrix in the lower right and zeros elsewhere",
      "A diagonal matrix with r ones and all other elements zero",
      "A matrix with ones along the main diagonal"
    ],
    correctAnswer: 0,
    explanation: "The Normal Form of a matrix A of size m×n with rank r is a block matrix form where the upper left block is an identity matrix of size r×r (I_r) and all other elements are zeros."
  },
  {
    id: 3,
    question: "What is preserved when a matrix is reduced to its Normal Form?",
    options: [
      "Its determinant",
      "Its eigenvalues",
      "Its rank",
      "Its trace"
    ],
    correctAnswer: 2,
    explanation: "When a matrix is reduced to its Normal Form through elementary row and column operations, its rank is preserved. Other properties like determinant, eigenvalues, or trace may change."
  },
  {
    id: 4,
    question: "Which of the following is NOT an equivalent definition of matrix rank?",
    options: [
      "The maximum number of linearly independent rows",
      "The maximum number of linearly independent columns",
      "The sum of all elements in the matrix",
      "The dimension of the row space"
    ],
    correctAnswer: 2,
    explanation: "The sum of all elements in a matrix is not related to its rank. Matrix rank can be defined as the maximum number of linearly independent rows or columns, the dimension of the row or column space, the order of the largest non-singular square submatrix, etc."
  },
  {
    id: 5,
    question: "According to the Normal Form Theorem, two matrices are equivalent if and only if:",
    options: [
      "They have the same determinant",
      "They have the same size",
      "They have the same trace",
      "They have the same rank"
    ],
    correctAnswer: 3,
    explanation: "According to the Normal Form Theorem, two matrices are equivalent (one can be transformed into the other via elementary row and column operations) if and only if they have the same rank."
  },
  {
    id: 6,
    question: "Which operations are used to reduce a matrix to its Normal Form?",
    options: [
      "Only row operations",
      "Only column operations",
      "Both row and column operations",
      "Neither row nor column operations"
    ],
    correctAnswer: 2,
    explanation: "To reduce a matrix to its Normal Form, both elementary row and column operations are used. This distinguishes Normal Form from Row Echelon Form, which uses only row operations."
  },
  {
    id: 7,
    question: "What is the maximum possible rank of a 4×5 matrix?",
    options: [
      "4",
      "5",
      "9",
      "20"
    ],
    correctAnswer: 0,
    explanation: "For an m×n matrix, the maximum possible rank is min(m,n). For a 4×5 matrix, the maximum rank is min(4,5) = 4."
  },
  {
    id: 8,
    question: "What happens to a square matrix of full rank when reduced to Normal Form?",
    options: [
      "It becomes a diagonal matrix with arbitrary non-zero values",
      "It becomes a triangular matrix",
      "It becomes the identity matrix",
      "It becomes a matrix with zeros on the diagonal"
    ],
    correctAnswer: 2,
    explanation: "A square matrix of size n×n with full rank (rank = n) will become the identity matrix I_n when reduced to its Normal Form."
  },
  {
    id: 9,
    question: "In the process of reducing a matrix to Normal Form, what do we do after finding a pivot element?",
    options: [
      "Replace the entire row with zeros",
      "Make the pivot equal to 1, then create zeros below AND to the right of the pivot",
      "Make the pivot equal to 1, then create zeros only below the pivot",
      "Make the pivot equal to 1, then create zeros only to the right of the pivot"
    ],
    correctAnswer: 1,
    explanation: "After finding a pivot element, we make it equal to 1 (if it isn't already), then create zeros below the pivot using row operations and zeros to the right of the pivot using column operations."
  },
  {
    id: 10,
    question: "How does the rank of a matrix relate to the number of pivots in its Normal Form?",
    options: [
      "The rank equals twice the number of pivots",
      "The rank equals one less than the number of pivots",
      "The rank is not related to the number of pivots",
      "The rank equals the number of pivots"
    ],
    correctAnswer: 3,
    explanation: "The rank of a matrix is equal to the number of pivots (leading 1's) in its Normal Form."
  },
  {
    id: 11,
    question: "What is the primary difference between Row Echelon Form and Normal Form?",
    options: [
      "Row Echelon Form is applicable only to square matrices",
      "Normal Form requires both row and column operations, while Row Echelon Form uses only row operations",
      "Normal Form applies only to matrices of full rank",
      "Row Echelon Form doesn't preserve the rank of the matrix"
    ],
    correctAnswer: 1,
    explanation: "The primary difference is that Normal Form requires both row and column operations to create zeros around each pivot, while Row Echelon Form uses only row operations, creating zeros below but not to the right of pivots."
  },
  {
    id: 12,
    question: "Given a 3×3 matrix with full rank, how many non-zero elements will be in its Normal Form?",
    options: [
      "9",
      "6",
      "3",
      "1"
    ],
    correctAnswer: 2,
    explanation: "A 3×3 matrix with full rank (rank = 3) will have a Normal Form equal to the 3×3 identity matrix, which has exactly 3 non-zero elements (the ones on the main diagonal)."
  },
  {
    id: 13,
    question: "What happens to a matrix of rank 0 when reduced to Normal Form?",
    options: [
      "It can't be reduced to Normal Form",
      "It becomes the identity matrix",
      "It becomes a diagonal matrix",
      "It becomes the zero matrix"
    ],
    correctAnswer: 3,
    explanation: "A matrix of rank 0 has no non-zero pivots, so when reduced to Normal Form, it becomes the zero matrix with all elements equal to zero."
  },
  {
    id: 14,
    question: "How does a rank 1 linear transformation affect a 2D plane geometrically?",
    options: [
      "It rotates the plane",
      "It reflects the plane across a line",
      "It collapses the plane to a line",
      "It preserves the plane's dimensionality"
    ],
    correctAnswer: 2,
    explanation: "A rank 1 linear transformation in 2D collapses the plane to a line through the origin. All points in the plane are mapped to this line."
  },
  {
    id: 15,
    question: "If a 3×4 matrix A has rank 2, which of the following statements is true?",
    options: [
      "A is invertible",
      "The system Ax = b has a unique solution for any b",
      "The nullity of A is 2",
      "The column space of A has dimension 2"
    ],
    correctAnswer: 3,
    explanation: "If a 3×4 matrix A has rank 2, then its column space has dimension 2. For a non-square matrix, invertibility is not defined. The nullity of A would be 4-2=2, but the correct option was the dimension of the column space."
  },
  {
    id: 16,
    question: "What are elementary column operations used for in the Normal Form reduction process?",
    options: [
      "To change the size of the matrix",
      "To create zeros below the pivot elements",
      "To create zeros to the right of the pivot elements",
      "To change the determinant of the matrix"
    ],
    correctAnswer: 2,
    explanation: "In the Normal Form reduction process, elementary column operations are used to create zeros to the right of the pivot elements. Row operations are used to create zeros below the pivots."
  },
  {
    id: 17,
    question: "If a 2×2 matrix A has Normal Form as the identity matrix I₂, what can we conclude?",
    options: [
      "A has determinant 0",
      "A is not invertible",
      "A has rank less than 2",
      "A is invertible"
    ],
    correctAnswer: 3,
    explanation: "If a 2×2 matrix A has Normal Form as the identity matrix I₂, then A has full rank (rank = 2). For a square matrix, having full rank is equivalent to being invertible."
  },
  {
    id: 18,
    question: "Which property of a matrix is NOT preserved under elementary row and column operations?",
    options: [
      "Rank",
      "Determinant",
      "The number of rows and columns",
      "Normal Form"
    ],
    correctAnswer: 1,
    explanation: "The determinant of a matrix is not preserved under elementary row and column operations. Rank is preserved, as is the number of rows and columns. The Normal Form is the end result of these operations, not a property that needs to be preserved."
  },
  {
    id: 19,
    question: "Which of these is an elementary row operation?",
    options: [
      "Transposing the matrix",
      "Adding a scalar multiple of one row to another row",
      "Multiplying the entire matrix by a scalar",
      "Taking the determinant"
    ],
    correctAnswer: 1,
    explanation: "Adding a scalar multiple of one row to another row is an elementary row operation. The other options are not elementary row operations. The three types of elementary row operations are: interchanging two rows, multiplying a row by a non-zero scalar, and adding a scalar multiple of one row to another."
  },
  {
    id: 20,
    question: "What is the relationship between the rank of a matrix A and the dimension of its null space?",
    options: [
      "They are equal",
      "Their sum equals the number of columns in A",
      "Their sum equals the number of rows in A",
      "The rank minus the dimension of the null space equals 1"
    ],
    correctAnswer: 1,
    explanation: "By the Rank-Nullity Theorem, the rank of a matrix A plus the dimension of its null space equals the number of columns in A. If A is an m×n matrix, then rank(A) + nullity(A) = n."
  },
  {
    id: 21,
    question: "What does a matrix of rank 0 represent geometrically as a linear transformation?",
    options: [
      "It maps all vectors to a plane",
      "It maps all vectors to a line",
      "It maps all vectors to the origin",
      "It preserves the dimensionality of the space"
    ],
    correctAnswer: 2,
    explanation: "A matrix of rank 0 (the zero matrix) represents a linear transformation that maps all vectors to the origin. It collapses the entire space to a single point."
  },
  {
    id: 22,
    question: "If a 3×3 matrix has rank 2, how many pivots will appear in its Normal Form?",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correctAnswer: 2,
    explanation: "The number of pivots in the Normal Form equals the rank of the matrix. So a 3×3 matrix with rank 2 will have exactly 2 pivots (leading 1's) in its Normal Form."
  },
  {
    id: 23,
    question: "Two matrices A and B are equivalent under elementary row and column operations. Which of the following must be true?",
    options: [
      "A and B have the same determinant",
      "A and B have the same eigenvalues",
      "A and B have the same rank",
      "A and B have the same trace"
    ],
    correctAnswer: 2,
    explanation: "Two matrices are equivalent under elementary row and column operations if and only if they have the same rank. They may have different determinants, eigenvalues, or traces."
  },
  {
    id: 24,
    question: "What is the significance of a 'cross pattern' of zeros in the Normal Form reduction process?",
    options: [
      "It means the reduction process is complete",
      "It indicates the matrix is singular",
      "It surrounds each pivot element, with zeros above, below, to the left, and to the right",
      "It forms the shape of the identity matrix"
    ],
    correctAnswer: 2,
    explanation: "In the Normal Form reduction process, a 'cross pattern' of zeros surrounds each pivot element, with zeros above, below, to the left, and to the right of the pivot. This pattern is characteristic of the Normal Form."
  },
  {
    id: 25,
    question: "If a matrix has Normal Form with non-zero elements only in positions (1,1) and (2,2), what is its rank?",
    options: [
      "0",
      "1",
      "2",
      "Cannot be determined without more information"
    ],
    correctAnswer: 2,
    explanation: "If a matrix's Normal Form has non-zero elements (which would be 1's) only in positions (1,1) and (2,2), then it has exactly 2 pivots. The rank of the matrix equals the number of pivots, so the rank is 2."
  },
  {
    id: 26,
    question: "Find the rank of the matrix: $\\begin{pmatrix} 2 & 4 \\\\ 3 & 6 \\end{pmatrix}$",
    options: [
      "0",
      "1",
      "2",
      "Cannot be determined"
    ],
    correctAnswer: 1,
    explanation: "Let's reduce this to normal form. First, make the (1,1) element 1 by dividing row 1 by 2: $\\begin{pmatrix} 1 & 2 \\\\ 3 & 6 \\end{pmatrix}$. Now eliminate below the pivot: $R_2 = R_2 - 3R_1$, giving $\\begin{pmatrix} 1 & 2 \\\\ 0 & 0 \\end{pmatrix}$. Next, use column operations to create zeros to the right of the pivot: $C_2 = C_2 - 2C_1$, giving $\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$. The normal form has only one pivot, so the rank is 1."
  },
  {
    id: 27,
    question: "Find the rank of the matrix: $\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{pmatrix}$",
    options: [
      "1",
      "2",
      "3",
      "0"
    ],
    correctAnswer: 1,
    explanation: "Starting reduction: The (1,1) element is already 1. Eliminate below: $R_2 = R_2 - 4R_1$ and $R_3 = R_3 - 7R_1$, giving $\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & -3 & -6 \\\\ 0 & -6 & -12 \\end{pmatrix}$. Eliminate to the right: $C_2 = C_2 - 2C_1$ and $C_3 = C_3 - 3C_1$, giving $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & -3 & -6 \\\\ 0 & -6 & -12 \\end{pmatrix}$. For the second pivot, note that $R_3 = 2R_2$, showing dependency. Make (2,2) element 1: $R_2 = -\\frac{1}{3}R_2$, giving $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 2 \\\\ 0 & -6 & -12 \\end{pmatrix}$. Eliminate below: $R_3 = R_3 + 6R_2$, giving $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix}$. Eliminate to the right: $C_3 = C_3 - 2C_2$, giving $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. The normal form has 2 pivots, so the rank is 2."
  },
  {
    id: 28,
    question: "Calculate the rank of the matrix: $\\begin{pmatrix} 2 & 1 & 3 \\\\ 4 & 2 & 6 \\\\ -2 & -1 & -3 \\end{pmatrix}$",
    options: [
      "3",
      "2",
      "1",
      "0"
    ],
    correctAnswer: 2,
    explanation: "First, make (1,1) element 1 by dividing row 1 by 2: $\\begin{pmatrix} 1 & 1/2 & 3/2 \\\\ 4 & 2 & 6 \\\\ -2 & -1 & -3 \\end{pmatrix}$. Eliminate below: $R_2 = R_2 - 4R_1$ and $R_3 = R_3 + 2R_1$, giving $\\begin{pmatrix} 1 & 1/2 & 3/2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. Eliminate to the right: $C_2 = C_2 - (1/2)C_1$ and $C_3 = C_3 - (3/2)C_1$, giving $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. The normal form has only 1 pivot, so the rank is 1."
  },
  {
    id: 29,
    question: "Find the rank of the matrix: $\\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 3 & 1 \\\\ 2 & 1 & 5 \\end{pmatrix}$",
    options: [
      "1",
      "2",
      "3",
      "0"
    ],
    correctAnswer: 2,
    explanation: "First pivot (1,1) is already 1. Eliminate below: $R_3 = R_3 - 2R_1$, giving $\\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 3 & 1 \\\\ 0 & 1 & 1 \\end{pmatrix}$. Eliminate to the right: $C_3 = C_3 - 2C_1$, giving $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 3 & 1 \\\\ 0 & 1 & 1 \\end{pmatrix}$. Second pivot at (2,2): Make it 1 by dividing row 2 by 3: $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 1/3 \\\\ 0 & 1 & 1 \\end{pmatrix}$. Eliminate below: $R_3 = R_3 - R_2$, giving $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 1/3 \\\\ 0 & 0 & 2/3 \\end{pmatrix}$. Eliminate to the right: $C_3 = C_3 - (1/3)C_2$, giving $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 2/3 \\end{pmatrix}$. Third pivot at (3,3): Make it 1 by multiplying row 3 by 3/2: $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$. The normal form has 3 pivots, so the rank is 3."
  },
  {
    id: 30,
    question: "Determine the rank of the matrix: $\\begin{pmatrix} 2 & -1 & 3 \\\\ 6 & -3 & 9 \\\\ 4 & -2 & 6 \\end{pmatrix}$",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correctAnswer: 1,
    explanation: "Make first pivot 1: $R_1 = R_1/2$ gives $\\begin{pmatrix} 1 & -1/2 & 3/2 \\\\ 6 & -3 & 9 \\\\ 4 & -2 & 6 \\end{pmatrix}$. Eliminate below: $R_2 = R_2 - 6R_1$ and $R_3 = R_3 - 4R_1$ gives $\\begin{pmatrix} 1 & -1/2 & 3/2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. Eliminate to the right: $C_2 = C_2 + (1/2)C_1$ and $C_3 = C_3 - (3/2)C_1$ gives $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. The normal form has only 1 pivot, so the rank is 1."
  },
  {
    id: 31,
    question: "Find the rank of the matrix: $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$",
    options: [
      "0",
      "1",
      "2",
      "Cannot be determined"
    ],
    correctAnswer: 2,
    explanation: "First pivot (1,1) is already 1. Eliminate below: $R_2 = R_2 - 3R_1$ gives $\\begin{pmatrix} 1 & 2 \\\\ 0 & -2 \\end{pmatrix}$. Eliminate to the right: $C_2 = C_2 - 2C_1$ gives $\\begin{pmatrix} 1 & 0 \\\\ 0 & -2 \\end{pmatrix}$. Make second pivot 1: $R_2 = -R_2/2$ gives $\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$. The normal form has 2 pivots, so the rank is 2."
  },
  {
    id: 32,
    question: "For what value of λ is the rank of the matrix $\\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & λ & 6 \\\\ 3 & 6 & 9 \\end{pmatrix}$ equal to 2?",
    options: [
      "λ = 4",
      "λ = 5",
      "λ = 6",
      "λ = 3"
    ],
    correctAnswer: 0,
    explanation: "Let's reduce the matrix. First pivot (1,1) is already 1. Eliminate below: $R_2 = R_2 - 2R_1$ and $R_3 = R_3 - 3R_1$ gives $\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & λ-4 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. For the rank to be 2, we need exactly 2 pivots, which means $λ-4 ≠ 0$, so $λ ≠ 4$. However, let's check if this actually gives rank 2. Using column operations: $C_3 = C_3 - 3C_1$ gives $\\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & λ-4 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. Now $C_2 = C_2 - 2C_1$ gives $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & λ-4 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. If $λ-4 ≠ 0$, we can make the second pivot 1 and get rank 2. But if $λ = 4$, the second row becomes zero and we get rank 1. Therefore, for the rank to be 2, we need $λ = 4$."
  },
  {
    id: 33,
    question: "For what values of λ does the matrix $\\begin{pmatrix} 1 & 2 \\\\ 3 & λ \\end{pmatrix}$ have rank 1?",
    options: [
      "λ = 6 only",
      "λ = 7 only",
      "λ = 5 only",
      "λ = 6 or λ = -2"
    ],
    correctAnswer: 0,
    explanation: "For the rank to be 1, the determinant must be zero (rows must be linearly dependent). The determinant is $1 · λ - 2 · 3 = λ - 6$. Setting this equal to zero: $λ - 6 = 0$, so $λ = 6$. Let's verify by reducing to normal form with $λ = 6$: $\\begin{pmatrix} 1 & 2 \\\\ 3 & 6 \\end{pmatrix}$. First pivot (1,1) is already 1. Eliminate below: $R_2 = R_2 - 3R_1$ gives $\\begin{pmatrix} 1 & 2 \\\\ 0 & 0 \\end{pmatrix}$. Eliminate to the right: $C_2 = C_2 - 2C_1$ gives $\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$. So when $λ = 6$, the matrix has rank 1."
  },
  {
    id: 34,
    question: "For what value of μ does the matrix $\\begin{pmatrix} 2 & 1 & 3 \\\\ 4 & μ & 6 \\\\ 2 & 1 & 3 \\end{pmatrix}$ have rank 1?",
    options: [
      "μ = 0",
      "μ = 1",
      "μ = 2",
      "Any value of μ"
    ],
    correctAnswer: 3,
    explanation: "Note that row 3 is identical to row 1, showing linear dependence. Let's reduce: Make (1,1) element 1 by dividing row 1 by 2: $\\begin{pmatrix} 1 & 1/2 & 3/2 \\\\ 4 & μ & 6 \\\\ 2 & 1 & 3 \\end{pmatrix}$. Eliminate below: $R_2 = R_2 - 4R_1$ and $R_3 = R_3 - 2R_1$ gives $\\begin{pmatrix} 1 & 1/2 & 3/2 \\\\ 0 & μ-2 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. If $μ = 2$, row 2 becomes all zeros. But even if $μ ≠ 2$, let's check if we can get another pivot. Eliminate to the right: $C_2 = C_2 - (1/2)C_1$ and $C_3 = C_3 - (3/2)C_1$ gives $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & μ-2 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. Looking at the original matrix, we can see that row 3 = row 1 and column 3 = 3(column 1), showing multiple dependencies. Therefore, regardless of the value of μ, the rank will be 1."
  },
  {
    id: 35,
    question: "Find the rank of the matrix: $\\begin{pmatrix} 0 & 2 & 3 \\\\ 1 & 0 & 5 \\\\ 0 & 0 & 0 \\end{pmatrix}$",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correctAnswer: 2,
    explanation: "Since (1,1) is 0, we need to find a non-zero element below it. Element (2,1) is 1, so swap rows 1 and 2: $\\begin{pmatrix} 1 & 0 & 5 \\\\ 0 & 2 & 3 \\\\ 0 & 0 & 0 \\end{pmatrix}$. First pivot (1,1) is now 1. Eliminate to the right: $C_3 = C_3 - 5C_1$ gives $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 3 \\\\ 0 & 0 & 0 \\end{pmatrix}$. Second pivot at (2,2): Make it 1 by dividing row 2 by 2: $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 3/2 \\\\ 0 & 0 & 0 \\end{pmatrix}$. Eliminate to the right: $C_3 = C_3 - (3/2)C_2$ gives $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. The normal form has 2 pivots, so the rank is 2."
  },
  {
    id: 36,
    question: "For what value of λ does the matrix $\\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & λ & 6 \\\\ 3 & 6 & λ+3 \\end{pmatrix}$ have rank 2?",
    options: [
      "λ = 2",
      "λ = 3",
      "λ = 4",
      "λ = 5"
    ],
    correctAnswer: 2,
    explanation: "Let's reduce the matrix. First pivot (1,1) is already 1. Eliminate below: $R_2 = R_2 - 2R_1$ and $R_3 = R_3 - 3R_1$ gives $\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & λ-4 & 0 \\\\ 0 & 0 & λ-6 \\end{pmatrix}$. For rank 2, exactly one of $λ-4$ or $λ-6$ must be zero. If $λ = 4$, then row 2 becomes zero and row 3 has $λ-6 = -2$, giving rank 2. If $λ = 6$, then row 3 becomes zero and row 2 has $λ-4 = 2$, also giving rank 2. To verify, let's continue reducing for $λ = 4$: $\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & -2 \\end{pmatrix}$. Make third pivot 1: $R_3 = -R_3/2$ gives $\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$. Eliminate above: $R_1 = R_1 - 3R_3$ gives $\\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$. Eliminate to the right: $C_2 = C_2 - 2C_1$ gives $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$ with rank 2. Therefore, λ = 4 gives rank 2."
  },
  {
    id: 37,
    question: "Consider the matrix $A = \\begin{pmatrix} 2 & 1 & 4 \\\\ 3 & 2 & 5 \\\\ 5 & 3 & 9 \\end{pmatrix}$. What is its rank?",
    options: [
      "1",
      "2",
      "3",
      "0"
    ],
    correctAnswer: 1,
    explanation: "Let's check if there are any dependencies between rows. We can see that row 3 = row 1 + row 2 (2+3=5, 1+2=3, 4+5=9). This immediately tells us the rank is at most 2. Let's verify by reducing to normal form. Make first pivot 1: $R_1 = R_1/2$ gives $\\begin{pmatrix} 1 & 1/2 & 2 \\\\ 3 & 2 & 5 \\\\ 5 & 3 & 9 \\end{pmatrix}$. Eliminate below: $R_2 = R_2 - 3R_1$ and $R_3 = R_3 - 5R_1$ gives $\\begin{pmatrix} 1 & 1/2 & 2 \\\\ 0 & 1/2 & -1 \\\\ 0 & 0 & -1 \\end{pmatrix}$. Make second pivot 1: $R_2 = 2R_2$ gives $\\begin{pmatrix} 1 & 1/2 & 2 \\\\ 0 & 1 & -2 \\\\ 0 & 0 & -1 \\end{pmatrix}$. This confirms rank 2."
  },
  {
    id: 38,
    question: "For what value of λ does the matrix $\\begin{pmatrix} 1 & 2 \\\\ λ & 2λ \\end{pmatrix}$ have rank 1?",
    options: [
      "λ = 0 only",
      "λ = 1 only",
      "Any non-zero value of λ",
      "Any value of λ"
    ],
    correctAnswer: 3,
    explanation: "Note that the second row is λ times the first row: $\\begin{pmatrix} 1 & 2 \\\\ λ & 2λ \\end{pmatrix}$. This means the rows are linearly dependent for any non-zero λ, giving rank 1. When λ = 0, the second row becomes all zeros, also giving rank 1. Let's verify by reducing: First pivot (1,1) is already 1. Eliminate below: $R_2 = R_2 - λR_1$ gives $\\begin{pmatrix} 1 & 2 \\\\ 0 & 0 \\end{pmatrix}$. Eliminate to the right: $C_2 = C_2 - 2C_1$ gives $\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$ with rank 1. This works for any value of λ, so the rank is always 1."
  },
  {
    id: 39,
    question: "Find the rank of the matrix: $\\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 2 \\end{pmatrix}$",
    options: [
      "1",
      "2",
      "3",
      "0"
    ],
    correctAnswer: 1,
    explanation: "First pivot (1,1) is already 1. Eliminate below: $R_2 = R_2 - R_1$ and $R_3 = R_3 - R_1$ gives $\\begin{pmatrix} 1 & 1 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$. Eliminate to the right: $C_2 = C_2 - C_1$ and $C_3 = C_3 - C_1$ gives $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$. The normal form has 2 pivots, so the rank is 2."
  },
  {
    id: 40,
    question: "For what values of λ and μ does the matrix $\\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & λ & 6 \\\\ 3 & 6 & μ \\end{pmatrix}$ have rank 1?",
    options: [
      "λ = 4, μ = 9",
      "λ = 5, μ = 8",
      "λ = 3, μ = 7",
      "λ = 6, μ = 10"
    ],
    correctAnswer: 0,
    explanation: "For rank 1, all rows must be multiples of the first row. This means row 2 = 2·row 1 and row 3 = 3·row 1. For row 2: $[2, λ, 6] = 2·[1, 2, 3] = [2, 4, 6]$, which means λ = 4. For row 3: $[3, 6, μ] = 3·[1, 2, 3] = [3, 6, 9]$, which means μ = 9. Let's verify by reducing with these values: $\\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 3 & 6 & 9 \\end{pmatrix}$. Eliminate below: $R_2 = R_2 - 2R_1$ and $R_3 = R_3 - 3R_1$ gives $\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. Eliminate to the right: $C_2 = C_2 - 2C_1$ and $C_3 = C_3 - 3C_1$ gives $\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$ with rank 1. Therefore, λ = 4 and μ = 9 give rank 1."
  }
];

export default questions;