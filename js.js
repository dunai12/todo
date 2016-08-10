function newFunction(){
    var Todo = function(){
        this.model = ["сделать одно", "сделать второе", "сделать третье"];
        this.formInput = document.querySelector('.form-input__text');
        this.form = document.querySelector('.form-input__form');
        this.todoList = document.querySelector('.todo-wrapper__task-list');
        this.init();
    };
    //инициализация
    Todo.prototype.init = function(){
        this.render();
        var __self = this;
        this.form.onsubmit = function(e){
            __self.onFormSubmit(e);
        };
        this.todoList.onclick = function(e){
            __self.onButtonClick(e);
        };

    };

    Todo.prototype.render = function(){
        this.deliteAllElements();
        this.addDefoultElement();
    };
    //метод добавления элемента в модель
    Todo.prototype.addItem = function(item){
        this.model.splice(this.model.length, 0, item);
    };

    //добавление элемента в модель
    Todo.prototype.onFormSubmit = function(e){
        e.preventDefault();
        if(!this.formInput.value)return;
        this.addItem(this.formInput.value);
        this.addNewTask();
        this.resetForm();
    };
    //действие на нажатие кнопки удалить и вверх
    Todo.prototype.onButtonClick = function(e){
        var target = e.target,
            __self = this,
            targetIndex = function(){
                var parentElem = target.parentNode;
                return [].indexOf.call(__self.todoList.childNodes, parentElem);
            },
            close = document.querySelector('.list-element__button_close').className,
            up = document.querySelector('.list-element__button_up').className;

        if(target.className == close){
            this.model.splice(targetIndex(), 1);
            this.deliteAllElements();
            this.addDefoultElement();
        }

        if(target.className == up){
            if(targetIndex() === 0) return;
            var elem = this.model[targetIndex()],
                prevElem = this.model[targetIndex() - 1];
            this.model.splice(targetIndex() - 1, 1, elem);
            this.model.splice(targetIndex(), 1, prevElem);
            this.deliteAllElements();
            this.addDefoultElement();
        }
    };
    //метод создания шаблона задачи
    Todo.prototype.createElement = function(i, text){
        var tmpl = '<div class="list-element"><div class="list-element__index">{{i}}</div><div class="list-element__text">{{text}}</div><div class="list-element__button list-element__button_close">close</div><div class="list-element__button list-element__button_up">up</div></div>';
        return tmpl.replace('{{i}}',i).replace('{{text}}',text);
    };

    //метод добавления шаблона в список
    Todo.prototype.addElement = function(elem){
        this.todoList.insertAdjacentHTML('beforeEnd',elem);
    };

    //метод создания стандартного списка
    Todo.prototype.addDefoultElement = function(){
        var __self = this;
        this.model.forEach(function(v, i){
            var newElem = __self.createElement(i + 1, v);
            __self.addElement(newElem);
        });
    };
    //добавление элемента в список по сабмиту
    Todo.prototype.addNewTask = function(){
        var newElem = this.createElement(this.model.length, this.model[this.model.length - 1]);
        this.addElement(newElem);
    };

    //удаление всех элементов списка задач
    Todo.prototype.deliteAllElements = function(){
        while(this.todoList.childNodes.length){
            this.todoList.removeChild(this.todoList.firstChild);
        }
    };
    //ресет формы по сабмиту
    Todo.prototype.resetForm = function(){
        this.formInput.value = '';
    };



    window.todo = new Todo();
}