package loquim

import (
	"appengine"
	"appengine/user"
	"io"
	"fmt"
	"log"
	"net/http"
)

type Handler func(http.ResponseWriter, *http.Request)

type Resource struct {
	Name    string
	Index   Handler
	New     Handler
	Create  Handler
	Show    Handler
	Edit    Handler
	Update  Handler
	Destroy Handler
	Error   Handler
}

func NewResource(name string) *Resource {
	r := new(Resource)
	r.Name = name
	return r
}

func (res *Resource) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch {
		case res.Error != nil:
			res.Error(w,r)
		default:
			log.Fatal("No error function specified")
	}
}

func hello(w http.ResponseWriter, req *http.Request) {
		io.WriteString(w, "hello, world!\n")
}

func init() {
	r := NewResource("blog")
	r.Error = handler
	http.Handle("/", r)
}

func handler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	u := user.Current(c)
	if u == nil {
		url, err := user.LoginURL(c, r.URL.String())
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Location", url)
		w.WriteHeader(http.StatusFound)
		return
	}
	fmt.Fprintf(w, "Hello, %v!", u)
}

