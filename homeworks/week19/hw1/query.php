<?php
require_once('conn.php');

class Query {
  private $db;
  private $id;

  function __construct($id) {
    $this->db = new Db();
    $this->id = $id;
  }

  private function sqlCheckTodo() {
    if ($this->id) {
      return "SELECT *  
              FROM julypenguin_todolist
              WHERE id = ?";
    }
    return "SELECT *  
            FROM julypenguin_todolist";
  }

  private function sqlPostTodo() {
    return "INSERT INTO julypenguin_todolist(content)
            VALUES(?) ";
  }

  private function sqlUpdateTodo() {
    return "UPDATE julypenguin_todolist 
            SET content = ?
            WHERE id = ?";
  }

  private function sqlUpdateState() {
    return "UPDATE julypenguin_todolist
            SET state = ?
            WHERE id = ?";
  }

  private function sqlDelTodo() {
    return "DELETE FROM julypenguin_todolist
            where id = ?";
  }

  private function refValues($arr){
    if (strnatcmp(phpversion(),'5.3') >= 0) {
      $refs = array();
      foreach($arr as $key => $value)
        $refs[$key] = &$arr[$key];
      return $refs;
    }
    return $arr;
  }

  private function stmtExecute($sql, ...$args) {
    $stmt = $this->db->prepare($sql);
    call_user_func_array(array($stmt, 'bind_param'), self::refValues($args));
    $stmt->execute();
    return $stmt;
  }

  function checkTodo() {
    if ($this->id) {
      return $this->stmtExecute($this->sqlCheckTodo(), "i", $this->id);      
    }
    return $this->db->query($this->sqlCheckTodo());
  }

  function postTodo($content) {
    return $this->stmtExecute($this->sqlPostTodo(), "s", $content);
  }

  function updateTodo($content) {
    return $this->stmtExecute($this->sqlUpdateTodo(), "si", $content, $this->id);
  }

  function updateState($state) {
    return $this->stmtExecute($this->sqlUpdateState(), "si", $state, $this->id);
  }

  function delTodo() {
    return $this->stmtExecute($this->sqlDelTodo(), 'i', $this->id);
  }
}