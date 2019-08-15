<?php
class Board_model extends CI_Model {

  function get_comment_id($id) {
    $data = array(
      'id' => $id,
      'username' => $this->session->userdata('username')
    );
    $this->db
      ->select()
      ->from('julypenguin_comments C')
      ->where($data);

    $query = $this->db->get();
    return $query->result_array();
  }

  function get_password() {
    $username = $this->input->post('username');
    $this->db
      ->select('password')
      ->from('julypenguin_users')
      ->where('username', $username);

    $query = $this->db->get();
    return $query->result_array();
  }

  function get_me() {
    $username = $this->session->userdata('username');

    $this->db
      ->select('nickname, username, user_classification classification')
      ->from('julypenguin_users')
      ->where('username', $username);

    $query = $this->db->get();
    return $query->result_array();
  }

  function get_users() {
    $this->db
      ->select('U.username, U.nickname, U.user_classification classification, COUNT(C.content) content')
      ->from('julypenguin_users U')
      ->join('julypenguin_comments C', 'C.username = U.username', 'left')
      ->group_by('U.username');

    $query = $this->db->get();
    return $query->result_array();
  }

  function get_usernames() {
    $this->db
      ->select('U.username')
      ->from('julypenguin_users U');

    $query = $this->db->get();
    return $query->result_array();
  }

  function get_thumbsup() {
    $data = json_decode($this->input->raw_input_stream);    
    $thumbsUp = array(
      'username' => $this->session->userdata('username'),
      'comment_id' => $data->id
    );
    $this->db
      ->select('username')
      ->from('julypenguin_thumbsup')
      ->where($thumbsUp);

    $query = $this->db->get();
    return $query->result_array();
  }

  function set_user() {
    $passwordHash = password_hash($this->input->post('password'), PASSWORD_DEFAULT);

    $data = array(
      'nickname' => $this->input->post('nickname'),
      'username' => $this->input->post('username'),
      'password' => $passwordHash
    );
    return $this->db->insert('julypenguin_users', $data);
  }

  function set_comment() {
    $data = json_decode($this->input->raw_input_stream);
    $comment = array(
      'username' => $this->session->userdata('username'),
      'content' => $data->content,
      'layer' => $data->layer,
      'parent_id' => $data->id
    );
    return $this->db->insert('julypenguin_comments', $comment);
  }

  function set_thumbsUp() {
    $data = json_decode($this->input->raw_input_stream);
    $thumbsUp = array(
      'username' => $this->session->userdata('username'),
      'comment_id' => $data->id
    );
    return $this->db->insert('julypenguin_thumbsup', $thumbsUp);
  }

  function update_comment($id) {
    $data = json_decode($this->input->raw_input_stream);
    $comment = array(
      'content' => $data->content,
    );
    $this->db->where('id', $id);
    return $this->db->update('julypenguin_comments', $comment);
  }

  function update_authorization() {
    $data = json_decode($this->input->raw_input_stream);
    $comment = array(
      'user_classification' => $data->authority,
    );
    $this->db->where('username', $data->username);
    return $this->db->update('julypenguin_users', $comment);
  }

  function delete_comment($id) {
    return $this->db->delete('julypenguin_comments', array('id' => $id));
  }

  function delete_thumbsup() {
    $data = json_decode($this->input->raw_input_stream);
    $thumbsUp = array(
      'username' => $this->session->userdata('username'),
      'comment_id' => $data->id
    );
    return $this->db->delete('julypenguin_thumbsup', $thumbsUp);
  }

  function checkSubContent() {
    $sql = "
    SELECT C.id, C.content, C.layer, C.parent_id, C.created_at, U.nickname, U.username,
      (SELECT count(T.comment_id)  
       FROM julypenguin_thumbsup T
       WHERE C.id = T.comment_id) thumbsUpCount 
     FROM julypenguin_comments C LEFT JOIN julypenguin_users U
     ON C.username = U.username
     ORDER BY created_at DESC
     ";
     $query = $this->db->query($sql);
    return $query->result_array();
  }
}