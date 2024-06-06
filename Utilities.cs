namespace Tabloid.Utils
{
    public static class Utilities
    {    public static int CountWords(string input)
            {
                char[] delimiters = new char[] { ' ', '\r', '\n', '\t', '.', ',', ';', '!', '?' };
                string[] words = input.Split(delimiters, StringSplitOptions.RemoveEmptyEntries);
                return words.Length;
            }
    }
}

