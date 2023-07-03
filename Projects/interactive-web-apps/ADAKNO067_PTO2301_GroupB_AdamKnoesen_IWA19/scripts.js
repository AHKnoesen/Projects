authors = ["Steven D. Levitt","Stephen J. Dubner","Bill Bryson","Daniel Kahneman","Randy Pausch","Jeffrey Zaslow","Michael Lewis","Doris Kearns Goodwin","Alan Weisman","Mark Kurlansky","Susan Cain","Anne Frank","Eleanor Roosevelt","Susan Massotty","Henry David Thoreau","Bill McKibben","Lynne Truss","Carl Sagan","Oliver Sacks","Stephen King","Stephen Hawking","Viktor E. Frankl","Harold S. Kushner","William J. Winslade","Eric Schlosser","Malcolm Gladwell","Barry Fox","Irina Henegar","Orson Scott Card","S.E. Hinton","Frances Hodgson Burnett","George R.R. Martin","William Goldman","Khaled Hosseini","Ray Bradbury","Audrey Niffenegger","Gabriel García Márquez","Gregory Rabassa","Aldous Huxley","J.D. Salinger","John Steinbeck","Bram Stoker","Rubén Toledo","Nina Auerbach","E.B. White","Garth Williams","Rosemary Wells","William Shakespeare","William Golding","Fyodor Dostoevsky","David McDuff","Joseph Frank","Rick Riordan","Victor Hugo","Norman MacAfee","Charles E. Wilbour","Veronica Roth","Antoine de Saint-Exupéry","Richard Howard","Lewis Carroll","Martin Gardner","John Tenniel","F. Scott Fitzgerald","J.K. Rowling","Mary GrandPré","Dan Brown","Stephen Chbosky","Charlotte Brontë","Michael Mason","Oscar Wilde","Jeffrey Eugenides","Emily Brontë","Richard J. Dunn","Shel Silverstein","John Green","J.R.R. Tolkien","C.S. Lewis","Pauline Baynes","Markus Zusak","George Orwell","Russell Baker","C.M. Woodhouse","Stephenie Meyer","Harper Lee","Jane Austen","Anna Quindlen","Suzanne Collins"];

genres = ["Economics","Non-fiction","Business","Science","Psychology","Sociology","Audiobook","Self-help","Politics","Memoir","Biography","Religion","Essays","Picture-books","Childrens","Fiction","Travel","Humor","Nature","Adventure","History","Physics","British-literature","Historical","American","Biography-memoir","Reference","Classics","Short-stories","Philosophy","Adult","Plays","Drama","Animals","France","Contemporary","Middle-grade","Historical-fiction","Young-adult","Literature","Novels","Romance","Literary-fiction","School","19th-century","Poetry","Horror","Fantasy","Mystery","Science-fiction","Science-fiction-fantasy","Thriller","Paranormal","Vampires","Christian","Dystopia","20th-century","Gothic","Epic-fantasy","High-fantasy","Theatre","Magical-realism","Spanish-literature","Latin-american","Mythology","Russia","Russian-literature","Magic"];
let BOOKS_PER_PAGE = 36;
let allAuthors = JSON.stringify(books);
let currentBook = 0;
let currentTheme = "Day";
let showMoreBtn = document.querySelector("#listButton");
let themeBtn = document.querySelector("#themeButton");
themeBtn.addEventListener("click",function(){
	if(document.getElementById("themeForm").style.display == "block")
		document.getElementById("themeForm").style.display = "none";
	else
		document.getElementById("themeForm").style.display = "block";
});
function hideThemeForm()
{
	document.getElementById("themeForm").style.display = "none";
}
function saveTheme()
{
	let theme = document.getElementById("theme").value;
	if(theme == "Day")
	{
		currentTheme = "Day";
		document.body.style.background = "linear-gradient(0deg, rgba(var(--color-dark), 0.2), rgba(var(--color-dark), 0.1)), rgba(var(--color-light), 1)";
		let allBooks = document.querySelectorAll(".books");
		for(let b = 0; b < allBooks.length; b++)
			allBooks[b].classList.remove("night");
		let bookInfoTitle = document.querySelectorAll(".bookInfo > h4");
		for(let i = 0; i < bookInfoTitle.length; i++)
			bookInfoTitle[i].style.color = "#000";
	}
	else
	{
		currentTheme = "Night";
		document.body.style.background = "#2F2F37";
		let allBooks = document.querySelectorAll(".books");
		for(let b = 0; b < allBooks.length; b++)
			allBooks[b].classList.add("night");
		let bookInfoTitle = document.querySelectorAll(".bookInfo > h4");
		for(let i = 0; i < bookInfoTitle.length; i++)
			bookInfoTitle[i].style.color = "#fff";
	}
}
let searchBtn = document.querySelector("#searchButton");
searchBtn.addEventListener("click",function(){
	if(document.getElementById("searchForm").style.display == "block")
		document.getElementById("searchForm").style.display = "none";
	else
		document.getElementById("searchForm").style.display = "block";
});
function hideSearchForm()
{
	document.getElementById("searchForm").style.display = "none";
}
let booksFound = 1;
function searchBook()
{	
	let title = document.getElementById("title").value;
	let genre = document.getElementById("genre").value;
	let author = document.getElementById("author").value;
	if(genre != "" && genre == "All" && title == "")
		loadBooks();
	else if(author != "" && author == "All" && title == "")
		loadBooks();
	else if(title != "" && genre == "All" && author == "All")
	{
		booksFound = 1;
		document.getElementById("listItems").innerHTML = "";
		for(let b = 0; b < books.length; b++)
		{
			if(books[b].title.includes(title))
			{
				if(currentTheme == "Night")
				{
					document.getElementById("listItems").innerHTML += "<div class='books night' onclick='displayBookInfo(\"bookDetails"+b+"\")'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";					
				}
				else
				{
					document.getElementById("listItems").innerHTML += "<div class='books' onclick='displayBookInfo(\"bookDetails"+b+"\")'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
				}
				booksFound++;
			}
			if(booksFound >= 36)
				break;
		}
		if(booksFound < 36)
			document.getElementById("listButton").disabled = true;
	}
	else if(title != "" && genre != "All" && author == "All")
	{
		booksFound = 1;
		document.getElementById("listItems").innerHTML = "";
		for(let b = 0; b < books.length; b++)
		{
			if(books[b].title.includes(title) && books[b].genres.includes(genre))
			{
				if(currentTheme == "Night")
				{
					document.getElementById("listItems").innerHTML += "<div class='books night' onclick='displayBookInfo(\"bookDetails"+b+"\")'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
				}
				else
				{
					document.getElementById("listItems").innerHTML += "<div class='books' onclick='displayBookInfo(\"bookDetails"+b+"\")'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
				}
				booksFound++;
			}
			if(booksFound >= 36)
				break;
		}
		if(booksFound < 36)
			document.getElementById("listButton").disabled = true;
	}
	else if(title != "" && genre != "All" && author != "All")
	{
		booksFound = 1;
		document.getElementById("listItems").innerHTML = "";
		for(let b = 0; b < books.length; b++)
		{
			if(books[b].title.includes(title) && books[b].genres.includes(genre) && books[b].author.includes(author))
			{
				if(currentTheme == "Night")
				{
					document.getElementById("listItems").innerHTML += "<div class='books night' onclick='displayBookInfo(\"bookDetails"+b+"\")'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
				}
				else
				{
					document.getElementById("listItems").innerHTML += "<div class='books' onclick='displayBookInfo(\"bookDetails"+b+"\")'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
				}
				booksFound++;
			}
			if(booksFound >= 36)
				break;
		}
		if(booksFound < 36)
		{
			document.getElementById("listButton").disabled = true;
			document.getElementById("listItems").innerHTML += "<div class='textCenter'><button class='list__button' id='showAllButton' onclick='loadBooks()' style='display: inline-block;'>Show All</button></div>";
		}
	}
}
document.getElementById("listButton").innerHTML = "Show More ("+books.length+")";
for(let g = 0; g < genres.length; g++)
{
	document.getElementById("genre").innerHTML += "<option value='"+genres[g]+"'>"+genres[g]+"</option>";
}
for(let a = 0; a < authors.length; a++)
{
	document.getElementById("author").innerHTML += "<option value='"+authors[a]+"'>"+authors[a]+"</option>";
}
function loadBooks()
{
	document.getElementById("searchForm").style.display = "none";
	document.getElementById("listItems").innerHTML = "";
	if(books.length > BOOKS_PER_PAGE)
	{
		for(let b = 0; b < BOOKS_PER_PAGE; b++)
		{
			if(currentTheme == "Night")
			{
				document.getElementById("listItems").innerHTML += "<div class='books night' onclick='displayBookInfo(\"bookDetails"+b+"\")'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
			}
			else
			{
				document.getElementById("listItems").innerHTML += "<div class='books' onclick='displayBookInfo(\"bookDetails"+b+"\")'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
			}
			currentBook++;
		}
	}
	else
	{
		for(let b = 0; b < books.length; b++)
		{
			if(currentTheme == "Night")
			{
				document.getElementById("listItems").innerHTML += "<div class='books night'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
			}
			else
			{
				document.getElementById("listItems").innerHTML += "<div class='books'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
			}
			currentBook++;
		}
	}
}
loadBooks();
showMoreBtn.addEventListener("click",function(){
	let nextLastBook = currentBook+BOOKS_PER_PAGE;
	for(let b = currentBook; b < nextLastBook; b++)
	{
		if(currentTheme == "Night")
		{
			document.getElementById("listItems").innerHTML += "<div class='books night'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
		}
		else
		{
			document.getElementById("listItems").innerHTML += "<div class='books'><img src='"+books[b].image+"' width='100' height='100'><div class='bookInfo'><h4>"+books[b].title+"</h4><span>"+books[b].author+"</span></div></div><div class='bookDetails' id='bookDetails"+b+"' style='display: none;'><img src='"+books[b].image+"' width='250' height='250'><h2>"+books[b].title+"</h2><h4>"+books[b].author+"("+books[b].published.split('-')[0]+")</h4><p>"+books[b].description+"</p><button class='list__button' id='closeButton' onclick='displayBookInfo(\"bookDetails"+b+"\")'>Close</button></div>";
		}
		currentBook++;
	}
});
function displayBookInfo(bid)
{
	if(document.getElementById(bid).style.display == "block")
		document.getElementById(bid).style.display = "none";
	else
		document.getElementById(bid).style.display = "block";
}
//keyValue(books);
/*matches = books
page = 1;

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)

for ({ author, image, title, id }; extracted; i++) {
    const preview = createPreview({
        author,
        id,
        image,
        title
    })

    fragment.appendChild(preview)
}

data-list-items.appendChild(fragment)

genres = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element = 'All Genres'
genres.appendChild(element)

for ([id, name]; Object.entries(genres); i++) {
    document.createElement('option')
    element.value = value
    element.innerText = text
    genres.appendChild(element)
}

data-search-genres.appendChild(genres)

authors = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for ([id, name];Object.entries(authors); id++) {
    document.createElement('option')
    element.value = value
    element = text
    authors.appendChild(element)
}

data-search-authors.appendChild(authors)

data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day'

//documentElement.style.setProperty('--color-dark', css[v].dark);
//documentElement.style.setProperty('--color-light', css[v].light);
//data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

data-list-button.innerHTML =  [
    '<span>Show more</span>',
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
]

data-search-cancel.click() { data-search-overlay.open === false }
data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
data-settings-form.submit() { actions.settings.submit }
data-list-close.click() { data-list-active.open === false }

data-list-button.click() {
    document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
    actions.list.updateRemaining()
    page = page + 1
}

data-header-search.click() {
    data-search-overlay.open === true ;
    data-search-title.focus();
}

data-search-form.click(filters) {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    }

    if display.length < 1 
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')
    

    data-list-items.innerHTML = ''
    const fragment = document.createDocumentFragment()
    const extracted = source.slice(range[0], range[1])

    for ({ author, image, title, id }; extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }
    
    data-list-items.appendChild(fragments)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data-list-button.disabled = initial > 0

    data-list-button.innerHTML =  `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open = false
}

data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay).open === false
}

data-list-items.click() {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if active break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if !active return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data-list-description === active.description
}*/